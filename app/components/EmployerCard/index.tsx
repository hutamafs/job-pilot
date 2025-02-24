import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface EmployerCardProps {
  id: number | string;
  company: string;
  image: string | StaticImageData;
  location: string;
}

const EmployerCard: React.FC <EmployerCardProps> = (props) => {
  return (
    <div key={props.id} className="w-full flex flex-col bg-gray-50 shadow-md p-5 rounded-lg">
      <Link href={`/companies/${props.id}`} className="flex mt-4">
        <Image
          width={48}
          height={48}
          src={props.image}
          alt={props.company}
          className="w-16 h-16 mr-2 rounded-lg"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-gray-900 font-semibold mr-2">{props.company}</span>
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs uppercase mr-2 text-red-700 ring-1 ring-red-600/20 ring-inset">
              Featured
            </span>
          </div>
          <span className="text-gray-600">📍{props.location}</span>
        </div>
      </Link>
      <div className="mt-4 w-full bg-lightBlue50 px-6 py-3 rounded-sm flex items-center justify-center ">
        <Link
          href={`/jobs?company=${props.id}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          Open Positions (12)
        </Link>
      </div>
    </div>
  )
};

export default EmployerCard;
