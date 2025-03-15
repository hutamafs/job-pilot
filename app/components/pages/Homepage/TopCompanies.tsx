import { Container, CompanyCard } from "@/app/components";
import { Company as CompanyType } from "@/app/types";
import { prisma } from "@/app/utils/prisma";

const TopCompanies = async () => {
  try {
    const companies = await prisma.company.findMany({
      take: 3,
      include: { jobs: true },
    });
    const data = JSON.parse(JSON.stringify(companies));

    return (
      <Container className="pt-10">
        <div className="flex flex-col">
          <h1 className="text-2xl text-gray-900 font-bold">Top Companies</h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
            {data?.map((d: CompanyType) => <CompanyCard key={d.id} {...d} />)}
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Error fetching companies:", error);
    return <div>Error loading companies</div>;
  }
};

export default TopCompanies;
