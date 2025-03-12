import { Container } from "@/app/components";
import { cookies } from "next/headers";
import ActionComponent from "@/app/components/pages/Jobs/[id]/Action";
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaBriefcase,
  FaGraduationCap,
  FaWallet,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";

const JobDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const cookie = await cookies();
  const token = cookie.get("sb-access-token")?.value;
  try {
    const resolvedParams = await params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${resolvedParams.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const { data } = await response.json();
    if (!data) {
      return null;
    }

    return (
      <Container>
        {/* Job Header */}
        <div className="rounded-lg flex flex-col md:flex-row gap-6">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center md:items-start">
              <div className="w-16 h-16 bg-gray-200 rounded-full">
                {data.company.profilePicture}
              </div>
              <div className="flex flex-col ml-4 md:justify-center">
                <h1 className="text-xl font-bold text-black">{data.title}</h1>
                <div className="flex flex-col md:flex-row md:ml-3">
                  `{" "}
                  <p className="text-gray-600 text-sm">
                    at {data.company.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                      {data.jobType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <ActionComponent
              name={data.title}
              id={resolvedParams.id}
              data={data}
            />
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
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4  text-black">
              Desirable
            </h3>
            <ul className="list-disc text-sm text-gray-700 pl-6">
              {data.desirable.map((desirable: string) => (
                <li key={desirable}>{desirable}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4  text-black">Benefits</h3>
            <ul className="list-disc text-sm text-gray-700 pl-6">
              {data.benefits.map((benefit: string) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            {/* Salary & Location */}
            <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
              <div className="text-center md:text-left">
                <p className="text-black font-semibold">Yearly Salary (AUD)</p>
                <p className="text-green-600 text-lg font-semibold">
                  ${data.salary}
                </p>
              </div>
              <div className="text-center md:text-right mt-4 md:mt-0">
                <p className="text-black font-semibold">Job Location</p>
                <p className="text-lg flex items-center justify-center text-gray-500">
                  <FiMapPin className="mr-1" /> {data.location}
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
                    className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-lg"
                  >
                    {benefit}
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
                    {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col">
                  <FaRegClock className="mr-2 text-primary500 mb-2 text-xl" />
                  <p className="text-gray-600">Job Expire:</p>
                  <p className="font-semibold text-black text-sm">
                    {new Date(
                      new Date(data.createdAt).setMonth(
                        new Date(data.createdAt).getMonth() + 1
                      )
                    ).toLocaleDateString()}
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
                    {data.experience} years
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

            <div className="py-4 border-t">
              <h3 className="text-lg font-semibold mb-2 text-black">
                Share this job:
              </h3>
              <div className="flex space-x-4 items-center">
                <button className="flex items-center font-semibold text-primary500 bg-gray-100 px-3 py-2 rounded-md">
                  <IoIosLink className="mr-2 " /> Copy Links
                </button>
                <FaLinkedin className="text-blue-600 text-xl cursor-pointer" />
                <FaFacebook className="text-blue-700 text-xl cursor-pointer" />
                <FaTwitter className="text-blue-400 text-xl cursor-pointer" />
                <FaEnvelope className="text-gray-500 text-xl cursor-pointer" />
              </div>
            </div>

            <div className="py-4 border-t">
              <h3 className="text-lg font-semibold mb-2 text-black">
                Job Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.jobTags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg"
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
