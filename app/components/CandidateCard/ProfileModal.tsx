import { FaTimes, FaEnvelope, FaDownload, FaGlobe, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { HiOutlineCalendar, HiOutlineUser, HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineBriefcase } from "react-icons/hi";

import Modal from "../Modal";
import { Candidate as CandidateType } from '@/app/types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CandidateType
}

const ProfileModal:React.FC<ProfileModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  return (
    <Modal closeModal={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white max-w-4xl w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-xl font-semibold text-black">{profile.name}</h2>
              <p className="text-gray-500 text-sm">{profile.role}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {/* Left - Main Content */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold text-black">BIOGRAPHY</h3>
              <p className="text-sm text-gray-600">{profile.bio}</p>

              <h3 className="text-lg font-semibold text-black">COVER LETTER</h3>
              <p className="text-sm text-gray-600">{profile.coverLetter}</p>

              {/* Social Media */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-black">Follow me Social Media</h3>
                <div className="flex gap-3">
                  <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                    <FaGlobe className="text-blue-500 text-lg" />
                  </a>
                  <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                    <FaEnvelope className="text-blue-600 text-lg" />
                  </a>
                  <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                    <FaDownload className="text-gray-600 text-lg" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Sidebar */}
            <div className="space-y-4">
              {/* Personal Info */}
              <div className="p-4 bg-white shadow-md rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <HiOutlineCalendar className="text-xl text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">DATE OF BIRTH</p>
                    <p className="text-sm font-semibold">{new Date(profile.dob).toLocaleDateString()}</p>
                  </div>
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
                  <p className="text-xs font-semibold text-black">Download My Resume</p>
                  <p className="text-sm text-gray-700">{profile.name} PDF</p>
                </div>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaDownload size={18} />
                </button>
              </div>

              {/* Contact Info */}
              <div className="p-4 bg-white shadow-md rounded-lg space-y-3">
                <h3 className="text-lg font-semibold text-black">Contact Information</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaGlobe className="text-blue-500 text-lg" />
                  <a href={profile.website} className="text-sm font-semibold hover:underline">
                    {profile.website}
                  </a>
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
        </div>
      </div>
    </Modal>
  );
}

export default ProfileModal;
