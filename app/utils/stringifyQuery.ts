import { JobSearchQuery, CompanySearchQuery } from "@/app/types";

const stringifyQuery = (query: JobSearchQuery | CompanySearchQuery) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      if (key === "industry" || key === "jobType") {
        if (Array.isArray(value) && value.length) {
          value.forEach((v: string) => {
            params.append(key, v);
          });
        }
      } else {
        params.set(key, value);
      }
    }
  });
  return params.toString();
};

export default stringifyQuery;
