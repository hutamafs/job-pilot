'use client'

import Link from 'next/link';

import Container from "../../Container";
import JobCard from '../../JobCard';
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

const FeaturedJob = () => {
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
            data.map((d) => <JobCard key={d.id} {...d} /> )
          }
        </div>
      </div>
    </Container>
  )
};

export default FeaturedJob;
