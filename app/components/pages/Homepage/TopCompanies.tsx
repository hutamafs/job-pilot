import { Container, EmployerCard } from '@/app/components';
import { CompanyIcon } from '@/asset/banner';

const data = [
  {
    id: 1,
    company: 'Google',
    location: 'Mountain View, CA',
    image: CompanyIcon
  },
  {
    id: 2,
    company: 'Google',
    location: 'Mountain View, CA',
    image: CompanyIcon
  },
  {
    id: 3,
    company: 'Google',
    location: 'Mountain View, CA',
    image: CompanyIcon
  },
]

const TopCompanies = () => {
  return (
    <Container className="pt-10">
      <div className="flex flex-col">
        <h1 className="text-2xl text-gray-900 font-bold">Top Companies</h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
          {
            data.map((d) => (
              <EmployerCard key={d.id} {...d} />
            ))
          }
        </div>
      </div>
    </Container>
  )
};

export default TopCompanies;
