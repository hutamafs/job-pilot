import { Suspense } from 'react';
import LoadingSkeleton from './loading';

import { Breadcrumb } from '@/app/components/pages/Jobs';

const CandidateLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <SearchBar /> */}
      <Breadcrumb />
      <Suspense fallback={<LoadingSkeleton />}>
        {children}
      </Suspense>
    </div>
  )
};

export default CandidateLayout;
