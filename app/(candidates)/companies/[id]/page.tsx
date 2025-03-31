import { Container } from "@/app/components";
import Image from "next/image";
import Link from "next/link";
import {
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  HiOutlineCalendar,
  HiOutlineOfficeBuilding,
  HiOutlineUsers,
  HiOutlineBriefcase,
} from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";

const CompanyDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/companies/${id}`
  );
  const { data } = await res.json();
  if (!data) return null;

  return (
    <Container>
      <div className="rounded-lg flex flex-col md:flex-row gap-6">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between md:items-start">
            <Image
              src={data.logo}
              width={48}
              height={48}
              alt={data.name}
              className="bg-gray-200 rounded-full"
            />
            <div className="flex flex-col ml-4 md:justify-center">
              <h1 className="text-xl font-bold text-black uppercase">
                {data.name}
              </h1>
              <p className="text-gray-600 text-sm">at {data.industry}</p>
            </div>
          </div>

          <Link
            href={`/jobs?company=${data.name}`}
            className="flex items-center justify-center sm:col-span-2 bg-blue-600 text-white font-medium px-4 py-3 sm:py-4 rounded-md text-sm hover:bg-blue-700 transition"
          >
            View Open Positions <HiArrowRight />
          </Link>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2 text-black">Description</h2>
          <p className="text-sm text-gray600">{data.description}</p>
          <h3 className="text-lg font-semibold mt-4  text-black">
            Company Benefits
          </h3>
          <ul className="list-disc text-sm text-gray-700 pl-6">
            {data.benefits?.map((benefit: string) => (
              <li key={benefit} className="mb-2 capitalize">
                {benefit?.split("_").join(" ")}
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-4 text-black">
            Company Vision
          </h2>
          <p className="text-sm text-gray600">{data.vision}</p>
        </div>
        <div className="md:col-span-1 space-y-4">
          <div className="p-6 bg-white shadow-md rounded-lg grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineCalendar className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">FOUNDED IN:</p>
                <p className="text-sm font-semibold">
                  {new Date(data.founded).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineOfficeBuilding className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">ORGANIZATION TYPE</p>
                <p className="text-sm font-semibold capitalize">
                  {data.organizationType?.split("_").join(" ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineUsers className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">TEAM SIZE</p>
                <p className="text-sm font-semibold">{data.teamSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineBriefcase className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">INDUSTRY TYPES</p>
                <p className="text-sm font-semibold">{data.industry}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <FaGlobe className="text-blue-500 text-lg" />
                <Link
                  href={data.website}
                  className="text-sm font-semibold hover:underline"
                >
                  {data.website}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-500 text-lg" />
                <p className="text-sm">{data.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500 text-lg" />
                <p className="text-sm">{data.email}</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Follow us on:</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
              >
                <FaFacebook className="text-blue-600 text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
              >
                <FaTwitter className="text-blue-500 text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
              >
                <FaInstagram className="text-pink-500 text-lg" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
              >
                <FaYoutube className="text-red-500 text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CompanyDetails;
