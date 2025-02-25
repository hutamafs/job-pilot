import { headers } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";
import { FaUser, FaBriefcase, FaHeart } from "react-icons/fa";

const employerSidebar = [
  { name: "Overview", path: "overview", icon: <FaUser /> },
  { name: "Employers Profile", path: "employers-profile", icon: <FaBriefcase /> },
  { name: "Post a Job", path: "post-job", icon: <FaBriefcase /> },
  { name: "My Jobs", path: "my-jobs", icon: <FaBriefcase /> },
  { name: "Saved Candidate", path: "saved-candidates", icon: <FaHeart /> },
];

const candidateSidebar = [
  { name: "Overview", path: "overview", icon: <FaUser /> },
  { name: "Applied Jobs", path: "applied-jobs", icon: <FaBriefcase /> },
  { name: "Favorite Jobs", path: "favorite-jobs", icon: <FaHeart /> },
];

const Sidebar = async ({ isCandidate }: { isCandidate: boolean }) => {
  const sidebarItems = isCandidate ? candidateSidebar : employerSidebar;

  const headersList = await headers();
  const url = headersList.get("referer") || "";
  const { pathname } = new URL(url);
  const subpath = pathname.split("/")[3];

  return (
    <>
      <aside className="hidden md:block w-64 text-black p-4">
        <nav className="space-y-4">
          {sidebarItems.map((item) => (
            <NavItem key={item.path} href={`/dashboard/${isCandidate ? "candidate" : "employer"}/${item.path}`} label={item.name} icon={item.icon} active={subpath === item.path} />
          ))}
        </nav>
      </aside>
      <nav className="block md:hidden text-black pl-0 md:px-4 py-2 sticky top-0 z-10 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-6">
          {sidebarItems.map((item) => (
            <NavItem key={item.path} href={`/dashboard/${isCandidate ? "candidate" : "employer"}/${item.path}`} label={item.name} active={subpath === item.path} />
          ))}
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ href, icon, label, active }: { href: string; icon?: ReactNode; label: string; active: boolean }) => (
  <Link href={href} className={`flex items-center space-x-3 p-4 rounded-lg text-black ${active ? "bg-lightBlue50" : "hover:bg-gray-50"}`}>
    {icon && <span className={`text-lg ${active && 'text-blue-500'}`}>{icon}</span>}
    <span className={`text-sm ${active && 'text-blue-500'}`}>{label}</span>
  </Link>
);

export default Sidebar;
