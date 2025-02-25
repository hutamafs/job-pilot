import { ReactNode } from "react";
import { headers } from "next/headers";
import Sidebar from "./sidebar";
import { Container } from "../components";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const headersList = await headers();
  const fullUrl = headersList.get("referer") || "";

  // 🔥 Hardcoded role for now, but should come from auth in the future
  const isCandidate = fullUrl.includes("/dashboard/candidate");

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar (Fixed for Mobile) */}
        <div className="w-full md:w-64">
          <Sidebar isCandidate={isCandidate} />
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] bg-gray-300"></div>

        {/* Right Side Content */}
        <main className="flex-1 p-0 md:px-6">{children}</main>
      </div>
    </Container>
  );
};

export default DashboardLayout;
