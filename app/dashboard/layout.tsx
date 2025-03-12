import { UserProvider } from "./DashboardProvider";
import Sidebar from "./sidebar";
import { Container } from "../components";
import React, { ReactElement } from "react";
import apiRequest from "@/app/utils/apiRequest.server";

interface DashboardLayoutProps {
  children: ReactElement<{ userId: string }>;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { data } = await apiRequest<{ id: string; name: string }>("/get-user");

  return (
    <UserProvider user={data}>
      <Container className="">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-64">
            <Sidebar isCandidate={true} />
          </div>
          <div className="w-[1px] bg-gray-300" />

          <main className="flex-1 p-6 mt-3">{children}</main>
        </div>
      </Container>
    </UserProvider>
  );
}
