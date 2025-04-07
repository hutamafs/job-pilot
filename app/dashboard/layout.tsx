import { UserProvider } from "./DashboardProvider";
import Sidebar from "./sidebar";
import { Container } from "../components";
import { ReactElement } from "react";
import { getServerSession } from "../lib/";
import { SessionData } from "../types";
interface DashboardLayoutProps {
  children: ReactElement<{ userId: string }>;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  return (
    <UserProvider user={session?.user as SessionData}>
      <Container className="">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-64">
            <Sidebar isCandidate={session?.user?.type === "CANDIDATE"} />
          </div>
          <div className="w-[1px] bg-gray-300" />

          <main className="md:min-h-[calc(100vh-150px)] flex-1 py-3 md:p-6">
            {children}
          </main>
        </div>
      </Container>
    </UserProvider>
  );
}
