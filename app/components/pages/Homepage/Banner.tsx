import Image from "next/legacy/image";
import Container from "../../common/Container";
import * as Icon from "@/asset/banner";

// const data = [
//   {
//     number: "1,75,324",
//     description: "Live Jobs",
//     image: Icon.JobIcon,
//   },
//   {
//     number: "1,75,324",
//     description: "Companies",
//     image: Icon.CompanyIcon,
//   },
//   {
//     number: "1,75,324",
//     description: "Candidate",
//     image: Icon.CandidateIcon,
//   },
//   {
//     number: "1,75,324",
//     description: "New Jobs",
//     image: Icon.JobIcon,
//   },
// ];

const Banner = () => {
  return (
    <Container
      className="py-[40px] lg:py-[100px] mx-auto"
      backgroundColor="bg-gray400"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col w-[550px]">
            <span className="text-gray-900 text-5xl text-wrap">
              Find a job that suits your interest & skills.
            </span>
            <span className="mt-6 text-gray-600 text-base">
              Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
              in scelerisque leo, eget sollicitudin velit bestibulum.
            </span>
          </div>
          <Image
            src={Icon.BannerImage}
            width={500}
            height={380}
            className="hidden md:block"
            alt="banner-image"
          />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-10">
          {/* {data.map(({ number, description, image }) => (
            <div
              key={description}
              className="flex items-center bg-white shadow-md p-5 rounded-lg"
            >
              <Image
                src={image}
                width={64}
                height={64}
                alt={description}
                className="mr-5"
              />
              <div className="flex flex-col">
                <p className="text-2xl font-semibold text-gray900">{number}</p>
                <p className="text-gray600 text-base">{description}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </Container>
  );
};

export default Banner;
