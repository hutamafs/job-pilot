"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import Container from "../../common/Container";

const pathLabels: Record<string, string> = {
  jobs: "Find Jobs",
  "job-detail": "Job Details",
  "employer-detail": "Employer Details",
  employers: "Find Employers",
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const lastSegment = pathSegments[pathSegments.length - 1];
  if (!isNaN(Number(lastSegment))) {
    const parentSegment = pathSegments[pathSegments.length - 2];

    if (parentSegment === "jobs") {
      pathSegments[pathSegments.length - 1] = "job-detail";
    } else if (parentSegment === "companies") {
      pathSegments[pathSegments.length - 1] = "employer-detail";
    }
  }

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = pathLabels[segment] || segment.replace(/-/g, " ");

    return { label, href };
  });

  return (
    <Container backgroundColor="bg-gray50 lg:py-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-black capitalize">
          {breadcrumbs[breadcrumbs.length - 1]?.label}
        </span>

        <nav className="text-sm text-gray-500">
          <Link href="/" className="text-gray-600 hover:text-black">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href}>
              {" / "}
              <Link
                href={crumb.href}
                className={`hover:text-black ${
                  index === breadcrumbs.length - 1
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                {crumb.label.charAt(0).toUpperCase() + crumb.label.slice(1)}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </Container>
  );
};

export default Breadcrumb;
