"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Container from "../Container";
import { useAuth } from "@/app/context/AuthProvider";
import { useNotif } from "@/app/context/NotificationProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, role, loading, signOut } = useAuth();
  const { setNotif } = useNotif();

  const navLinks = [
    // { name: "Home", path: "/", role: "ALL" },
    { name: "Find Job", path: "/jobs", role: "CANDIDATE" },
    { name: "Employers", path: "/companies", role: "CANDIDATE" },
    { name: "Candidates", path: "/candidates", role: "EMPLOYER" },
    {
      name: "Dashboard",
      path: `/dashboard/${(role as string)?.toLowerCase()}/overview`,
      role: "ALL",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Container backgroundColor="bg-gray50">
      <div className="w-full flex justify-between items-center md:fixed md:top-0 md:left-0 md:w-full md:bg-gray50 md:shadow-md md:z-50 md:px-6 md:py-4">
        <Link href="/" className="text-primary500 font-bold text-xl">
          JobPilot
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center">
          {navLinks
            .filter((d) => d.role === "ALL" || d.role === role)
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
          {loading ? (
            <button
              className="px-4 py-2 bg-gray-300 text-white font-medium rounded-md cursor-wait"
              disabled
            >
              Loading...
            </button>
          ) : user ? (
            <button
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
              onClick={() => {
                signOut();
                setNotif("success", "Signed out successfully");
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
                  signOut();
                  setNotif("success", "Signed out successfully");
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
