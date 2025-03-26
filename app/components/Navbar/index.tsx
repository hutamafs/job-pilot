"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Container from "../common/Container";
import { useNotif } from "@/app/context/NotificationProvider";
import { createBrowserClient } from "@supabase/ssr";
import { useAuth } from "@/app/context/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { setNotif } = useNotif();
  const { user, role, setRole, setUser } = useAuth();

  const navLinks = [
    // { name: "Home", path: "/", role: "ALL" },
    { name: "Find Job", path: "/jobs", role: "CANDIDATE" },
    { name: "Employers", path: "/companies", role: "CANDIDATE" },
    { name: "Candidates", path: "/candidates", role: "COMPANY" },
    {
      name: "Dashboard",
      path: `/dashboard/${(role as unknown as string)?.toLowerCase()}/overview`,
      role: "ALL",
    },
  ];
  const logout = async () => {
    setRole("");
    setUser(null);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.refresh();
    router.push("/sign-in");
    setNotif("success", "Signed out successfully");
  };

  return (
    <Container backgroundColor="bg-gray50">
      <div className="w-full flex justify-between items-center md:fixed md:top-0 md:left-0 md:w-full md:bg-gray50 md:shadow-md md:z-50 md:px-6 md:pl-8 xl:pl-24 md:py-4">
        <Link href="/" className="text-primary500 font-bold text-xl">
          JobPilot
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center">
          {navLinks
            .filter((d) => d.role === "ALL" || d.role === role)
            .filter((d) => (role ? d : d.name !== "Dashboard"))
            .map(({ name, path }, index) => (
              <li key={index} className="mr-6">
                <Link
                  href={path}
                  className={`font-medium text-base ${pathname === path ? "text-primary500" : "text-gray600"} hover:text-gray900 transition-colors"`}
                >
                  {name}
                </Link>
              </li>
            ))}
          {user ? (
            <button
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
              onClick={() => {
                logout();
              }}
            >
              Sign Out
            </button>
          ) : (
            <Link
              className="px-4 py-2 bg-primary500 text-white font-medium rounded-md hover:bg-blue-700 transition"
              href="/sign-in"
            >
              Sign In
            </Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg p-6 z-50">
          <ul className="flex flex-col items-start space-y-4">
            {navLinks
              .filter((d) => d.role === "ALL" || d.role === role)
              .filter((d) => (role ? d : d.name !== "Dashboard"))
              .map(({ name, path }, index) => (
                <li key={index}>
                  <Link
                    className={`font-medium text-base ${pathname === path ? "text-primary500" : "text-gray600"} hover:text-gray900 transition-colors"`}
                    href={path}
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            {user ? (
              <button
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
              >
                Sign Out
              </button>
            ) : (
              <li>
                <Link
                  className="px-4 py-2 bg-primary500 text-white font-medium rounded-md hover:bg-blue-700 transition"
                  href="/sign-in"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
