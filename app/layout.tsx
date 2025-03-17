import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "./components";
import { NotifProvider } from "./context";
import { getUser } from "./utils/supabase/getUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Job Pilot | Find Your Dream Job",
  description: "A modern job portal connecting candidates and employers.",
  keywords: ["jobs", "career", "employment", "job portal"],
  openGraph: {
    title: "Job Pilot - Find Your Dream Job",
    description:
      "A modern job portal that helps job seekers and employers connect easily.",
    type: "website",
    url: "https://job-pilot.vercel.app",
    images: [
      {
        url: "https://job-pilot.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Job Pilot Cover",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user`, {
    headers: {
      Authorization: `${user?.id}`,
    },
    cache: "no-store",
  });
  const { data, role } = await res.json();
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Global Auth Context */}
        <NotifProvider>
          {/* Modals (Ensuring they are outside the main content for accessibility) */}
          <div id="modal"></div>

          {/* Main Content */}
          <main className="w-full flex flex-col flex-grow">
            <Navbar user={data} role={role} />
            {children}
          </main>
        </NotifProvider>
        <Footer />
      </body>
    </html>
  );
}
