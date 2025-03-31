import {
  Banner,
  // FeaturedJob,
  // TopCompanies,
  QuickRegister,
} from "@/app/components/pages/Homepage";
import HomeWrapper from "./HomeWrapper";
import { getUserRole } from "./utils";

const Home = async () => {
  const { data } = await getUserRole();
  return (
    <>
      <HomeWrapper />
      <div className="w-full h-full">
        <Banner />
        {/* <FeaturedJob />
        <TopCompanies /> */}
        {!data && <QuickRegister />}
      </div>
    </>
  );
};

export default Home;
