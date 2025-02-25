import Link from 'next/link';

import { Container, JobCard } from '@/app/components';
import { Job as JobType } from '@/app/types';
import { prisma } from '@/app/utils/prisma';

const FeaturedJob = async () => {
  try {
    const jobs = await prisma.job.findMany({ take: 3, include: { company: true } });
    const data = JSON.parse(JSON.stringify(jobs));
    
    return (
      <Container className="py-10">
        <div className="flex flex-col">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-2xl text-gray-900 font-bold">Featured Job</h1>
            <Link href="/jobs" className="text-primary500 border border-blue-200 p-2 rounded-sm font-semibold">
              View all →
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
            {
              data.map((d: JobType) => <JobCard key={d.id} {...d} /> )
            }
          </div>
        </div>
      </Container>
    )
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return <div>Error loading featured job</div>;
  }
};

export default FeaturedJob;
