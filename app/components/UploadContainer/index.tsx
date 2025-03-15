import Image from "next/legacy/image";
import { FaFileUpload, FaDownload } from "react-icons/fa";

interface UploadContainerProps {
  source: string;
  label: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadContainer = ({
  source,
  label,
  handleFileUpload,
}: UploadContainerProps) => {
  return (
    <label className="border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer w-full md:w-3/5 h-60 text-gray-600 hover:border-blue-500 transition relative overflow-hidden">
      {source ? (
        <div className="flex flex-col h-full items-center w-full">
          {/* ✅ PDF Preview */}
          <div className="relative w-full h-full">
            <Image src={source} alt={label} objectFit="cover" layout="fill" />
            <div className="absolute bottom-0 z-10 bg-white bg-opacity-25 flex items-center align-center p-2 rounded-md w-full">
              <p className="text-sm text-gray-900 truncate text-center w-full">
                {source?.split("/").pop()?.split("-").slice(1).join("-")}
              </p>
              <a
                href={source}
                download
                className="text-gray-500 hover:text-blue-500 transition"
              >
                <FaDownload size={16} />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <FaFileUpload className="text-gray-400 text-4xl mb-2" />
          <span className="text-sm">Add {label}</span>
        </div>
      )}
      {/* Hidden file input */}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />
    </label>
  );
};

export default UploadContainer;
