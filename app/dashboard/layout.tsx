import { ReactNode } from "react";
// import { headers } from "next/headers";
import Sidebar from "./sidebar";
import { Container } from "../components";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  // const headersList = await headers();
  // const fullUrl = headersList.get("referer") || "";

  return (
    <Container className="">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar (Fixed for Mobile) */}
        <div className="w-full lg:w-64">
          <Sidebar isCandidate={true} />
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] bg-gray-300"></div>

        {/* Right Side Content */}
        <main className="flex-1 p-0 lg:p-6 mt-3">{children}</main>
      </div>
    </Container>
  );
};

export default DashboardLayout;
