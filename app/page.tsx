import {
  Banner,
  SearchBar,
  FeaturedJob,
  TopCompanies,
  QuickRegister,
} from '@/app/components/pages/Homepage';

export default function Home() {
  return (
    <div className="w-full h-full">
      <SearchBar />
      <Banner />
      <FeaturedJob />
      <TopCompanies />
      <QuickRegister />
    </div>
  );
}
