import { Container, EmployerCard } from '@/app/components';
import { SearchJob } from '@/app/components/pages/Jobs';
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

const Jobs = () => {
  return (
    <>
      <SearchJob />
      <Container className="py-8">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
          {
            data.map((d) => <EmployerCard key={d.id} {...d} /> )
          }
        </div>
        {/* <Pagination /> */}
      </Container>
    </>
  )
};

export default Jobs;
