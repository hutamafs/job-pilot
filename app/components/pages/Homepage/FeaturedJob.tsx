import Link from 'next/link';
import Image from 'next/image';

import Container from "../../Container";
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
            data.map((d) => (
              <Link
                key={d.id}
                className="flex flex-col bg-gray-50 shadow-md p-5 rounded-lg"
                href={`/jobs/${d.id}`}
              >
                <span className="text-gray-900 text-lg font-semibold">{d.title}</span>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-bold uppercase mr-2 text-green-700 ring-1 ring-green-600/20 ring-inset">{d.type}</span>
                    <span className="text-gray-600 text-[14px] lg:text-base">{d.salary}</span>
                  </div>
                  <div className="flex mt-4">
                    <Image
                      width={48}
                      height={48}
                      src={d.image}
                      alt={d.title}
                      className="w-16 h-16 mr-2 rounded-lg"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-semibold">{d.company}</span>
                      <span className="text-gray-600">📍{d.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </Container>
  )
};

export default FeaturedJob;
