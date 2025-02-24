import { Container, JobCard } from '@/app/components';
import { SearchJob } from '@/app/components/pages/Jobs';
import { JobIcon } from '@/asset/banner';

const data = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$120,000 - $200,000',
    type: 'Part-Time',
    image: JobIcon
  },
  {
    id: 2,
    title: 'Senior UX Designer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$120,000 - $200,000',
    type: 'Part-Time',
    image: JobIcon
  },
  {
    id: 3,
    title: 'Marketing Officer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$120,000 - $200,000',
    type: 'Part-Time',
    image: JobIcon
  },
]

const Jobs = () => {
  return (
    <>
      <SearchJob />
      <Container className="py-8">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
          {
            data.map((d) => <JobCard key={d.id} {...d} /> )
          }
        </div>
        {/* <Pagination /> */}
      </Container>
    </>
  )
};

export default Jobs;
