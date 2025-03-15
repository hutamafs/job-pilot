import { FaCamera } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";
import Image from "next/legacy/image";
import { Candidate as CandidateType } from "@/app/types";

interface ProfileUploadProps {
  isLoading: boolean;
  formData: Partial<CandidateType> & {
    profilePicture: string | File;
  };
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
}

const ProfileUpload = ({
  isLoading,
  formData,
  handleFileUpload,
}: ProfileUploadProps) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="profile-upload" className="cursor-pointer">
        <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray400 flex items-center justify-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : formData.profilePicture ? (
            <Image
              src={
                typeof formData.profilePicture === "string"
                  ? formData.profilePicture
                  : URL.createObjectURL(formData.profilePicture)
              }
              width={120}
              height={120}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaCamera className="text-gray-400 text-4xl absolute" />
          )}
        </div>
      </label>
      <input
        type="file"
        id="profile-upload"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "profilePicture")}
      />
    </div>
  );
};

export default ProfileUpload;
