import  { Breadcrumb } from '@/app/components/pages/Jobs';

const CandidateLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <SearchBar /> */}
      <Breadcrumb />
      {children}
    </div>
  )
};

export default CandidateLayout;
