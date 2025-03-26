import {
  Banner,
  // FeaturedJob,
  // TopCompanies,
  QuickRegister,
} from "@/app/components/pages/Homepage";
import HomeWrapper from "./HomeWrapper";

const Home = async () => {
  return (
    <>
      <HomeWrapper />
      <div className="w-full h-full">
        <Banner />
        {/* <FeaturedJob />
        <TopCompanies /> */}
        <QuickRegister />
      </div>
    </>
  );
};

export default Home;
