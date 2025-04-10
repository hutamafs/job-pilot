import Link from "next/link";
import Image from "next/legacy/image";
import { Company as CompanyType } from "@/app/types";

const CompanyCard: React.FC<CompanyType> = (props) => {
  return (
    <div
      key={props.id}
      className="w-full flex flex-col bg-gray-50 shadow-md p-5 rounded-lg"
    >
      <Link href={`/companies/${props.id}`} className="flex mt-4">
        <Image
          width={72}
          height={60}
          src={props.logo || ""}
          alt={props.name}
          className="mr-2 rounded-lg"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-gray-900 font-semibold mr-2">
              {props.name}
            </span>
          </div>
          <span className="text-gray-600">📍{props.location}</span>
        </div>
      </Link>
      <div className="mt-4 w-full bg-lightBlue50 px-6 py-3 rounded-sm flex items-center justify-center ">
        <Link
          href={`/jobs?company=${props.name}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          Open Positions ({props.jobs.length})
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
