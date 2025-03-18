import Image from "next/legacy/image";

import notFoundImage from '@/asset/404/404.webp';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">Oops! Page Not Found</h1>
          <p className="text-gray-600 mt-3">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src={notFoundImage}
            alt="Under Construction"
            width={500}
            height={400}
            className="max-w-full"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} JobPilot - All Rights Reserved.
      </div>
    </div>
  );
}
