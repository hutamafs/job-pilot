import {
  Banner,
  FeaturedJob,
  TopCompanies,
  QuickRegister,
} from "@/app/components/pages/Homepage";
import HomeWrapper from "./HomeWrapper";
import { getSessionUser } from "./utils/getSessionUser";

const Home = async () => {
  const user = await getSessionUser();
  return (
    <>
      <HomeWrapper />
      <div className="w-full h-full">
        <Banner />
        {user?.type === "CANDIDATE" && (
          <>
            <FeaturedJob />
            <TopCompanies />
          </>
        )}
        {!user && <QuickRegister />}
      </div>
    </>
  );
};

export default Home;
