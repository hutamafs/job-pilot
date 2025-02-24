import { Container } from '@/app/components';
import ActionComponent from '@/app/components/pages/Jobs/[id]/Action';
import { FaGlobe, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlineCalendar, HiOutlineOfficeBuilding, HiOutlineUsers, HiOutlineBriefcase } from "react-icons/hi";

const CompanyDetails = () => {
  return (
    <Container>
      <div className="rounded-lg flex flex-col md:flex-row gap-6">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center md:items-start">
            <div className="w-16 h-16 bg-gray-200 rounded-full">image here</div>
            <div className="flex flex-col ml-4 md:justify-center">
              <h1 className="text-xl font-bold text-black">Senior UX Designer</h1>
              <p className="text-gray-600 text-sm">at Facebook</p>
            </div>
          </div>
          <ActionComponent />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2 text-black">Description</h2>
          <p className="text-sm text-gray600">
          Velstar is a Shopify Plus agency, and we partner with brands to help them grow, and we also do the same with our people! Here at Velstar, we don’t just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients. The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure, and scalable features for our clients on the Shopify platform. Want to work with us? You’re in good company!
          </p>
          <h3 className="text-lg font-semibold mt-4  text-black">Company Benefits</h3>
          <ul className="list-disc text-sm text-gray-700 pl-6">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Integer nec odio. Praesent libero.</li>
            <li>Sed cursus ante dapibus diam.</li>
          </ul>
          <h2 className="text-lg font-semibold mt-4 text-black">Company Vision</h2>
          <p className="text-sm text-gray600">
          Velstar is a Shopify Plus agency, and we partner with brands to help them grow, and we also do the same with our people! Here at Velstar, we don’t just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients. The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure, and scalable features for our clients on the Shopify platform. Want to work with us? You’re in good company!
          </p>
        </div>
        <div className="md:col-span-1 space-y-4">
          <div className="p-6 bg-white shadow-md rounded-lg grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineCalendar className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">FOUNDED IN:</p>
                <p className="text-sm font-semibold">founded</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineOfficeBuilding className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">ORGANIZATION TYPE</p>
                <p className="text-sm font-semibold">company</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineUsers className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">TEAM SIZE</p>
                <p className="text-sm font-semibold">teamsize</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineBriefcase className="text-xl text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">INDUSTRY TYPES</p>
                <p className="text-sm font-semibold">industry</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <FaGlobe className="text-blue-500 text-lg" />
                {/* <a href={data.website} className="text-sm font-semibold hover:underline">
                  {data.website}
                </a> */}
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-500 text-lg" />
                <p className="text-sm">0123</p>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500 text-lg" />
                <p className="text-sm">qwer@gmao.com</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Follow us on:</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <FaFacebook className="text-blue-600 text-lg" />
              </a>
              <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <FaTwitter className="text-blue-500 text-lg" />
              </a>
              <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <FaInstagram className="text-pink-500 text-lg" />
              </a>
              <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <FaYoutube className="text-red-500 text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CompanyDetails;
