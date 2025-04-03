"use client";
import Link from "next/link";
import {
  FaTimes,
  FaEnvelope,
  FaDownload,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaBookmark,
  FaLinkedin,
  // FaGithub,
  FaFacebook,
} from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import {
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineGlobeAlt,
  HiOutlineBriefcase,
} from "react-icons/hi";

import Modal from "@/app/components/common/Modal";
import { Candidate as CandidateType } from "@/app/types";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CandidateType;
  isSaved: boolean;
  handleSaveCandidate: () => Promise<void>;
}

interface SocialLinkProps {
  href?: string;
  icon: React.ReactNode;
  color?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon,
  color = "text-blue-600",
}) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
    >
      <span className={`${color} text-lg`}>{icon}</span>
    </a>
  );
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  isSaved,
  handleSaveCandidate,
}) => {
  if (!isOpen) return null;
  return (
    <Modal className="w-[90%] p-3 md:p-6 lg:w-[767px]" closeModal={onClose}>
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 pr-5">
        <div>
          <h2 className="text-xl font-semibold text-black">{profile.name}</h2>
          <p className="text-gray-500 text-sm">{profile.role}</p>
        </div>
        <button
          className="text-blue-500 hover:text-blue-700"
          title="Save Candidate"
          onClick={handleSaveCandidate}
        >
          {isSaved ? <FaBookmark size={18} /> : <FiBookmark size={18} />}
        </button>
        <button
          onClick={onClose}
          className="text-gray-800 hover:text-gray-700 absolute right-1 top-2"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-6 mt-4">
        {/* Left - Main Content */}
        <div className="md:basis-[55%] space-y-4">
          <h3 className="text-lg font-semibold text-black">BIOGRAPHY</h3>
          <p className="text-sm text-gray-600">{profile.bio}</p>

          <h3 className="text-lg font-semibold text-black">COVER LETTER</h3>
          <p className="text-sm text-gray-600">{profile.coverLetter}</p>

          {/* Social Media */}
          {(profile.linkedin || profile.facebook || profile.website) && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-black">
                Follow my Social Media
              </h3>
              <div className="flex gap-3">
                <SocialLink
                  href={profile.website}
                  icon={<FaGlobe />}
                  color="text-blue-500"
                />
                <SocialLink
                  href={`mailto:${profile.email}`}
                  icon={<FaEnvelope />}
                />
                <SocialLink href={profile.linkedin} icon={<FaLinkedin />} />
                <SocialLink href={profile.facebook} icon={<FaFacebook />} />
              </div>
            </div>
          )}
        </div>

        {/* Right - Sidebar */}
        <div className="md:basis-[45%] space-y-4">
          {/* Personal Info */}
          <div className="p-4 bg-white shadow-md rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineCalendar className="text-xl text-blue-500" />
              {profile.dob && (
                <div>
                  <p className="text-xs text-gray-500">DATE OF BIRTH</p>
                  <p className="text-sm font-semibold">
                    {new Date(profile.dob).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineGlobeAlt className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">NATIONALITY</p>
                <p className="text-sm font-semibold">{profile.nationality}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineUser className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">MARITAL STATUS</p>
                <p className="text-sm font-semibold">{profile.maritalStatus}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineUser className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">GENDER</p>
                <p className="text-sm font-semibold">{profile.gender}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineBriefcase className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">EXPERIENCE</p>
                <p className="text-sm font-semibold">{profile.experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineAcademicCap className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">EDUCATION</p>
                <p className="text-sm font-semibold">{profile.education}</p>
              </div>
            </div>
          </div>

          {/* Resume Download */}
          <div className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-black">
                Download My Resume
              </p>
              <p className="text-sm text-gray-700">{profile.name} PDF</p>
            </div>
            <Link
              target="_blank"
              href={profile.resumeUrl}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaDownload size={18} />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="p-4 bg-white shadow-md rounded-lg space-y-3">
            <h3 className="text-lg font-semibold text-black">
              Contact Information
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              {profile.website && (
                <>
                  <FaGlobe className="text-blue-500 text-lg" />

                  <a
                    href={
                      profile.website.startsWith("http")
                        ? `https://${profile.website}`
                        : profile.website
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold hover:underline break-all"
                  >
                    {profile.website}
                  </a>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-blue-500 text-lg" />
              <p className="text-sm">{profile.location}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhone className="text-blue-500 text-lg" />
              <p className="text-sm">{profile.phone}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-blue-500 text-lg" />
              <p className="text-sm">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
