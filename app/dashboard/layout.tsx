import { UserProvider } from "./DashboardProvider";
import Sidebar from "./sidebar";
import { Container } from "../components";
import React, { ReactElement } from "react";
import { createClient } from "@/app/utils/supabase/server";

interface DashboardLayoutProps {
  children: ReactElement<{ userId: string }>;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user`, {
    headers: {
      Authorization: `${user?.user?.id}`,
    },
  });
  const { data } = await res.json();
  
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
