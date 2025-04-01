import { Container } from "@/app/components";
import Link from "next/link";
import Image from "next/image";
import ActionComponent from "@/app/components/pages/Jobs/[id]/ActionComponent";
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaBriefcase,
  FaGraduationCap,
  FaWallet,
  FaUser,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { createClient } from "@/app/utils/supabase/server";
import { getUserRole } from "@/app/utils";
import SocialMediaComponent from "@/app/components/pages/Jobs/[id]/SocialMediaComponent";

const JobDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { role } = await getUserRole();
  try {
    const resolvedParams = await params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${resolvedParams.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user?.user?.id}`,
        },
      }
    );
    const { data } = await response.json();
    if (!data) {
      return null;
    }
    console.log(data, 36);

    return (
      <Container>
        {/* Job Header */}
        <div className="rounded-lg flex flex-col md:flex-row gap-6">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center md:items-start">
              {data.company.logo ? (
                <Image
                  src={data.company.logo}
                  alt={data.company.name}
                  width={72}
                  height={48}
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-400 text-2xl" />
                </div>
              )}

              <div className="flex flex-col ml-4 md:justify-center">
                <h1 className="text-xl font-bold text-black">{data.title}</h1>
                <div className="flex flex-col md:flex-row md:ml-3">
                  <p className="text-gray-600 text-sm">
                    at {data.company.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 capitalize text-green-700 text-xs font-medium px-2 py-1 rounded">
                      {data.jobType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {role === "COMPANY" ? (
              <Link
                className="flex items-center justify-center text-lightBlue50 bg-primary500 font-bold px-4 py-2 rounded-lg hover:text-orange-200"
                href={`/dashboard/company/edit-job/${data.id}`}
              >
                Edit
              </Link>
            ) : (
              <ActionComponent
                name={data.title}
                id={resolvedParams.id}
                data={data}
              />
            )}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-black">
              Job Description
            </h2>
            <p className="text-sm text-gray600">{data.description}</p>
            <h3 className="text-lg font-semibold mt-4  text-black">
              Requirements
            </h3>
            <ul className="list-disc text-sm text-gray-700 pl-6">
              {data.requirements.map((requirement: string) => (
                <li className="capitalize" key={requirement}>
                  {requirement.split("_").join(" ")}
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4  text-black">
              Desirable
            </h3>
            <ul className="list-disc text-sm text-gray-700 pl-6">
              {data.desirable.map((desirable: string) => (
                <li className="capitalize" key={desirable}>
                  {desirable.split("_").join(" ")}
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4  text-black">Benefits</h3>
            <ul className="list-disc text-sm text-gray-700 pl-6">
              {data.benefits.map((benefit: string) => (
                <li className="capitalize" key={benefit}>
                  {benefit.split("_").join(" ")}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            {/* Salary & Location */}
            <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
              <div className="text-center md:text-left">
                <p className="text-black font-semibold">Yearly Salary (AUD)</p>
                <p className="text-green-600 text-lg font-semibold">
                  ${data.salary?.toLocaleString()}
                </p>
              </div>
              <div className="text-center md:text-right mt-4 md:mt-0">
                <p className="text-black font-semibold">Job Location</p>
                <p className="text-lg flex items-center justify-center text-gray-500">
                  <FiMapPin className="mr-1" /> {data.city}, {data.country}
                </p>
              </div>
            </div>

            {/* Job Benefits */}
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-2 text-black">
                Job Benefits
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.benefits.map((benefit: string, index: number) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-lg capitalize"
                  >
                    {benefit.split("_").join(" ")}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Overview */}
            <div className="py-4 border-t">
              <h3 className="text-lg font-semibold mb-2 text-black">
                Job Overview
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <FaRegCalendarAlt className="mr-2 text-primary500 mb-2 text-xl" />
                  <p className="text-gray-600">Job Posted:</p>
                  <p className="font-semibold text-black text-sm">
                    {new Date(data.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col">
                  <FaRegClock className="mr-2 text-primary500 mb-2 text-xl" />
                  <p className="text-gray-600">Job Expire:</p>
                  <p className="font-semibold text-black text-sm">
                    {new Date(data.expiredAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col">
                  <FaBriefcase className="mr-2 text-primary500 mb-2 text-xl" />
                  <p className="text-gray-600">Job Level</p>
                  <p className="font-semibold text-black text-sm">
                    {data.jobLevel}
                  </p>
                </div>
                <div className="flex flex-col">
                  <FaWallet className="mr-2 text-primary500 mb-2 text-xl" />
                  <p className="text-gray-600">Experience:</p>
                  <p className="font-semibold text-black text-sm">
                    {data.experience}
                  </p>
                </div>
                <div className="flex flex-col">
                  <FaGraduationCap className="mr-2 text-primary500 mb-2 text-xl" />
                  <p className="text-gray-600">Education:</p>
                  <p className="font-semibold text-black text-sm">
                    {data.education}
                  </p>
                </div>
              </div>
            </div>

            <SocialMediaComponent />

            <div className="py-4 border-t">
              <h3 className="text-lg font-semibold mb-2 text-black">
                Job Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.jobTags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-200 capitalize text-gray-700 text-sm px-3 py-1 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Error fetching job:", error);
    return <div>Error loading job detail</div>;
  }
};

export default JobDetails;
