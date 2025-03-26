import { UserProvider } from "./DashboardProvider";
import Sidebar from "./sidebar";
import { Container } from "../components";
import React, { ReactElement } from "react";
import { getUserRole } from "@/app/utils";
interface DashboardLayoutProps {
  children: ReactElement<{ userId: string }>;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { data, role } = await getUserRole();

  return (
    <UserProvider user={data}>
      <Container className="">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-64">
            <Sidebar isCandidate={role === "CANDIDATE"} />
          </div>
          <div className="w-[1px] bg-gray-300" />

          <main className="flex-1 py-3 md:p-6">{children}</main>
        </div>
      </Container>
    </UserProvider>
  );
}
