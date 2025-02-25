'use client'
import Link from 'next/link';
import Image from 'next/image';
import { FiBookmark } from "react-icons/fi";
import { Job as JobCardProps } from '@/app/types';

const JobCard: React.FC<JobCardProps> = (props) => {
  return (
    <Link
      key={props.id}
      className="flex flex-col bg-gray-50 shadow-md p-5 rounded-lg"
      href={`/jobs/${props.id}`}
    >
      <span className="text-gray-900 text-lg font-semibold">{props.title}</span>
      <div className="flex flex-col relative">
        <div className="flex items-center">
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-bold uppercase mr-2 text-green-700 ring-1 ring-green-600/20 ring-inset">{props.jobType}</span>
          <span className="text-gray-600 text-[14px] lg:text-base">{props.salary}</span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex">
            <Image
              width={48}
              height={48}
              src={props.company.profilePicture}
              alt={props.title}
              className="w-16 h-16 mr-2 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold">{props.company.name}</span>
              <span className="text-gray-600">📍{props.location}</span>
            </div>
          </div>
          <button key={props.id} onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation();
          }}
          className="flex items-center absolute bottom-5 -right-5 text-primary500 px-4 py-2 rounded-lg">
            <FiBookmark size={20} />
          </button>
        </div>
      </div>
    </Link>
  )
};

export default JobCard;
