export const dynamic = "force-dynamic";
import { Container, CompanyCard } from "@/app/components";
import SearchCompany from "@/app/components/pages/Companies/SearchCompany";
import { Pagination } from "@/app/components";
import { Company as CompanyType } from "@/app/types";
import { stringifyQuery } from "@/app/utils";
import apiRequest from "@/app/utils/apiRequest.server";

interface CompaniesProps {
  searchParams?: Promise<{ search?: string; page?: number; location: string }>;
}

const Companies = async ({ searchParams }: CompaniesProps) => {
  try {
    const resolvedParams = await searchParams;
    const query = {
      search: resolvedParams?.search || "",
      location: resolvedParams?.location || "",
      page: resolvedParams?.page || 1,
    };
    const params = stringifyQuery(query);
    const { data } = await apiRequest(`/companies?${params.toString()}`, {
      method: "GET",
    });
    const { companies, totalPages } = data as {
      companies: CompanyType[];
      totalPages: number;
    };

    if (!companies) {
      return null;
    }

    return (
      <>
        <SearchCompany query={query} />
        <Container className="py-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
            {companies.map((d: CompanyType) => (
              <CompanyCard key={d.id} {...d} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </Container>
      </>
    );
  } catch (error) {
    console.error("Error fetching companies:", error);
    return <div>Error loading companies</div>;
  }
};

export default Companies;
