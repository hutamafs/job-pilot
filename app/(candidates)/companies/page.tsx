export const dynamic = "force-dynamic";
import { Container, EmployerCard } from '@/app/components';
import { SearchJob } from '@/app/components/pages/Jobs';
import { Pagination } from '@/app/components';
import { Company as CompanyType } from '@/app/types';

interface CompaniesProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

const Companies = async ({ searchParams }: CompaniesProps) => {
  try {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams?.page) || 1;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/companies?page=${currentPage}`);
    const { data, totalPages } = await response.json();

    if (!data) {
      return null;
    }

    return (
      <>
        <SearchJob />
        <Container className="py-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
            {
              data.map((d: CompanyType) => <EmployerCard key={d.id} {...d} /> )
            }
          </div>
          <Pagination totalPages={totalPages} />
        </Container>
      </>
    )
  } catch (error) {
    console.error("Error fetching companies:", error);
    return <div>Error loading companies</div>;
  }
  
};

export default Companies;
