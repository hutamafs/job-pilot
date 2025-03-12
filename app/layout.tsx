import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "./components";
import { AuthProvider, NotifProvider } from "./context";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Global Auth Context */}
        <AuthProvider>
          <NotifProvider>
            {/* Modals (Ensuring they are outside the main content for accessibility) */}
            <div id="modal"></div>

            {/* Main Content */}
            <main className="w-full flex flex-col flex-grow">
              <Navbar />
              {children}
              <Footer />
            </main>
          </NotifProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
