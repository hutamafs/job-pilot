import Link from 'next/link';

import Container from '../../Container';

const QuickRegister = () => {
  return (
    <Container backgroundColor="bg-gray400">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between mx-auto py-8 lg:py-16">
        <div className="flex flex-col w-full lg:w-[49%] mb-8 lg:mb-0 lg:h-[200px] bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900">Become a Candidate</h3>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.
          </p>
          <Link href="/register" className="mt-4 px-5 py-3 bg-primary500 text-white font-semibold rounded-md hover:bg-primary500/80 transition">
            Register Now →
          </Link>
        </div>
        <div className="relative w-full lg:w-[49%] lg:h-[200px] flex flex-col p-8 rounded-lg shadow-md bg-primary500 text-white">
          <h3 className="text-2xl font-bold">Become an Employer</h3>
          <p className="mt-2">
            Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor.
          </p>
          <Link href="/register" className="mt-4 px-5 py-3 bg-white text-primary500 font-semibold rounded-md hover:bg-gray-100 transition">
            Register Now →
          </Link>
        </div>
      </div>
    </Container>
  )
};

export default QuickRegister;
