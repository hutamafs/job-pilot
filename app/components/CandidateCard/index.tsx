'use client';

import Image from 'next/image';

import { FaMapMarkerAlt, FaWallet } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi2";
import { useState } from "react";

interface ProfileCardProps {
  name: string;
  role: string;
  location: string;
  experience: string;
  image: string;
  selected?: boolean;
}

export default function ProfileCard({ name, role, location, experience, image, selected = false }: ProfileCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg transition-all relative ${
        selected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:shadow-md"
      }`}
    >
      <div className="flex md:items-center gap-4">
        <Image
          width={60} 
          height={60}
          src={image}
          alt={name}
          className="rounded-sm object-cover" />
        <div>
          <h2 className={`text-sm font-semibold ${selected ? "text-blue-600" : "text-gray-900"}`}>{name}</h2>
          <p className="text-xs text-gray-500">{role}</p>
          <div className="flex flex-col md:flex-row md:items-center mt-1 md:mt-0 gap-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <FaWallet className="text-gray-400" />
              <span>{experience}</span>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setBookmarked(!bookmarked)} className="text-gray-400 hover:text-gray-600 absolute top-5 right-5 md:top-2 transition">
        {bookmarked ? <BsBookmarkFill className="text-blue-600" /> : <BsBookmark />}
      </button>
      <button
        className={`flex items-center justify-center gap-2 px-3 py-1.5 mt-2 md:mt-4 rounded-md text-sm font-semibold transition-all ${
          selected
            ? "bg-blue-600 text-white"
            : "bg-blue-100 text-blue-600 hover:bg-blue-200"
        }`}
      >
        View Profile <HiArrowRight />
      </button>
    </div>
  );
}
