"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Container from "../Container";
import { useUserRole } from "@/app/context/role-provider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const role = useUserRole();

  const navLinks = [
    { name: "Home", path: "/", role: "ALL"},
    { name: "Find Job", path: "/jobs", role: "CANDIDATE" },
    { name: "Employers", path: "/companies", role: "CANDIDATE" },
    { name: "Candidates", path: "/candidates", role: "EMPLOYER" },
    { name: "Dashboard", path: `/dashboard/${(role as string)?.toLowerCase()}`, role: "ALL" },
  ];

  return (
    <Container backgroundColor="bg-gray50">
      <div className="w-full flex justify-between items-center">
        <Link href="/" className="text-primary500 font-bold text-xl">
          JobPilot
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center">
          {navLinks
          .filter((d) => d.role === "ALL" || d.role === role)
          .map(({ name, path }, index) => (
            <li key={index} className="mr-6">
              <Link href={path} className={`font-medium text-base ${pathname === path ? 'text-primary500' : 'text-gray600'} hover:text-gray900 transition-colors"`}>
                {name}
              </Link>
            </li>
          ))}
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
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg p-4 z-50">
          <ul className="flex flex-col items-start space-y-4">
            {navLinks
            .filter((d) => d.role === "ALL" || d.role === role)
            .map(({ name, path }, index) => (
              <li key={index}>
                <Link
                  className={`font-medium text-base ${pathname === path ? 'text-primary500' : 'text-gray600'} hover:text-gray900 transition-colors"`}
                  href={path}
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
