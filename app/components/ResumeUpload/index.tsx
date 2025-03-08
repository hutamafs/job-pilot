import { FaFileUpload, FaDownload } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";
// import PDFViewer from "pdf-viewer-reactjs";

interface ResumeUploadProps {
  isLoading: boolean;
  formData: {
    resumeUrl?: string;
  };
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
}
const ResumeUpload = ({
  isLoading,
  formData,
  handleFileUpload,
}: ResumeUploadProps) => {
  return (
    <label className="border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer w-full h-[50vh] text-gray-600 hover:border-blue-500 transition relative">
      {isLoading ? (
        <LoadingSpinner />
      ) : formData.resumeUrl ? (
        <div className="flex flex-col items-center h-[50vh] justify-center w-full">
          {/* ✅ PDF Preview */}
          <embed
            src={formData.resumeUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          />

          {/* ✅ Filename with Download Button */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-center break-all max-w-[200px]">
              {formData.resumeUrl.split("/").pop()}
            </p>
            <a
              href={formData.resumeUrl}
              download
              className="text-gray-500 hover:text-blue-500 transition"
            >
              <FaDownload size={16} />
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <FaFileUpload className="text-gray-400 text-4xl mb-2" />
          <span className="text-sm">Add CV/Resume (PDF only)</span>
        </div>
      )}
      {/* Hidden file input */}
      <input
        type="file"
        className="hidden"
        accept="application/pdf"
        onChange={(e) => handleFileUpload(e, "resumeUrl")}
      />
    </label>
  );
};

export default ResumeUpload;
