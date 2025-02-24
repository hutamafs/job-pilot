import Link from "next/link";

import Container from "../Container";

const Footer = () => {
  return (
    <Container backgroundColor="bg-black-900">
      <footer className="text-gray-400 py-12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-2xl font-bold">JobPilot</h3>
          <p className="mt-2">Call now: <span className="text-primary500 font-medium">(319) 555-0115</span></p>
          <p className="mt-1">6391 Elgin St. Celina, Delaware 10299, New York, United States</p>
        </div>

        <div>
          <h4 className="text-white text-lg font-semibold">Candidate</h4>
          <ul className="mt-2 space-y-2">
            <li><Link href="/jobs" className="hover:text-primary500 transition">Browse Jobs</Link></li>
            <li><Link href="/companies" className="hover:text-primary500 transition">Browse Employers</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary500 transition">Candidate Dashboard</Link></li>
            <li><Link href="/saved-jobs" className="hover:text-primary500 transition">Saved Jobs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg font-semibold">Employers</h4>
          <ul className="mt-2 space-y-2">
            <li><Link href="/post-job" className="hover:text-primary500 transition">Post a Job</Link></li>
            <li><Link href="/candidates" className="hover:text-primary500 transition">Browse Candidates</Link></li>
            <li><Link href="/company-dashboard" className="hover:text-primary500 transition">Employers Dashboard</Link></li>
            <li><Link href="/applications" className="hover:text-primary500 transition">Applications</Link></li>
          </ul>
        </div>

      </footer>
      <div className="mt-8 border-t w-full border-gray-700 pt-6">
        <p>© {new Date().getFullYear()} JobPilot. All Rights Reserved.</p>
      </div>
    </Container>
  )
};

export default Footer;
