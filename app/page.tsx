import {
  Banner,
  FeaturedJob,
  TopCompanies,
  QuickRegister,
} from "@/app/components/pages/Homepage";
import HomeWrapper from "./HomeWrapper";
import { getUserRole } from "./utils";

const Home = async () => {
  const { data, role } = await getUserRole();
  return (
    <>
      <HomeWrapper />
      <div className="w-full h-full">
        <Banner />
        {role === "CANDIDATE" && (
          <>
            <FeaturedJob />
            <TopCompanies />
          </>
        )}
        {!data && <QuickRegister />}
      </div>
    </>
  );
};

export default Home;
