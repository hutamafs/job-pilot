"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { ReactNode } from "react";
import { FaUser, FaBriefcase, FaHeart, FaBookmark } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const employerSidebar = [
  { name: "Overview", path: "overview", icon: <FaUser /> },
  {
    name: "Applied Candidates",
    path: "applied-candidates",
    icon: <FaBriefcase />,
  },
  { name: "Post a Job", path: "post-job", icon: <FaBriefcase /> },
  { name: "My Jobs", path: "my-jobs", icon: <FaBriefcase /> },
  { name: "Saved Candidate", path: "saved-candidates", icon: <FaHeart /> },
  { name: "Settings", path: "settings", icon: <FiSettings /> },
];

const candidateSidebar = [
  { name: "Overview", path: "overview", icon: <FaUser /> },
  { name: "Applied Jobs", path: "applied-jobs", icon: <FaBriefcase /> },
  { name: "Saved Jobs", path: "saved-jobs", icon: <FaBookmark /> },
  { name: "Settings", path: "settings", icon: <FiSettings /> },
];

const Sidebar = ({ isCandidate }: { isCandidate: boolean }) => {
  const sidebarItems = isCandidate ? candidateSidebar : employerSidebar;
  const pathname = usePathname();
  const subpath = pathname.split("/")[3];

  return (
    <>
      <aside className="hidden lg:block w-64 text-black p-4">
        <nav className="space-y-4">
          {sidebarItems.map((item) => (
            <NavItem
              key={item.path}
              href={`/dashboard/${isCandidate ? "candidate" : "company"}/${item.path}`}
              label={item.name}
              icon={item.icon}
              active={subpath === item.path}
            />
          ))}
        </nav>
      </aside>
      <nav className="block lg:hidden text-black pl-0 md:px-4 py-2 sticky top-0 z-10 overflow-x-auto whitespace-nowrap">
        <div className="flex px-4 pl-0 space-x-6">
          {sidebarItems.map((item) => (
            <NavItem
              key={item.path}
              href={`/dashboard/${isCandidate ? "candidate" : "employer"}/${item.path}`}
              label={item.name}
              active={subpath === item.path}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

const NavItem = ({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon?: ReactNode;
  label: string;
  active: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center space-x-3 p-4 rounded-lg text-black ${active ? "bg-lightBlue50" : "hover:bg-gray-50"}`}
  >
    {icon && (
      <span className={`text-lg ${active && "text-blue-500"}`}>{icon}</span>
    )}
    <span className={`text-sm ${active && "text-blue-500"}`}>{label}</span>
  </Link>
);

export default Sidebar;
