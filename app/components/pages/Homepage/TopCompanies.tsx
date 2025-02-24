import Link from 'next/link';
import Image from 'next/image';

import Container from "../../Container";
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
              <div key={d.id} className="w-full flex flex-col bg-gray-50 shadow-md p-5 rounded-lg">
                <Link href={`/companies/${d.id}`} className="flex mt-4">
                  <Image
                    width={48}
                    height={48}
                    src={d.image}
                    alt={d.company}
                    className="w-16 h-16 mr-2 rounded-lg"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-gray-900 font-semibold mr-2">{d.company}</span>
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs uppercase mr-2 text-red-700 ring-1 ring-red-600/20 ring-inset">
                        Featured
                      </span>
                    </div>
                    <span className="text-gray-600">📍{d.location}</span>
                  </div>
                </Link>
                <div className="mt-4 w-full bg-lightBlue50 px-6 py-3 rounded-sm flex items-center justify-center ">
                  <Link
                    href={`/jobs?company=${d.id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Open Positions (12)
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  )
};

export default TopCompanies;
