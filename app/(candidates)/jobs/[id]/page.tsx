import { Container } from '@/app/components';
import ActionComponent from '@/app/components/pages/Jobs/[id]/Action';
import { FaRegCalendarAlt, FaRegClock, FaBriefcase, FaGraduationCap, FaWallet } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';

const JobDetails = () => {
  return (
    <Container>
    {/* Job Header */}
      <div className="rounded-lg flex flex-col md:flex-row gap-6">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center md:items-start">
            <div className="w-16 h-16 bg-gray-200 rounded-full">image here</div>
            <div className="flex flex-col ml-4 md:justify-center">
              <h1 className="text-xl font-bold text-black">Senior UX Designer</h1>
              <div className="flex flex-col md:flex-row md:ml-3">
                <p className="text-gray-600 text-sm">at Facebook</p>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">FULL-TIME</span>
                  <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-xl">Featured</span>
                </div>
              </div>
            </div>
          </div>
          <ActionComponent />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Description */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-black">Job Description</h2>
          <p className="text-sm text-gray600">
          Velstar is a Shopify Plus agency, and we partner with brands to help them grow, and we also do the same with our people! Here at Velstar, we don’t just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients. The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure, and scalable features for our clients on the Shopify platform. Want to work with us? You’re in good company!
          </p>
          <h3 className="text-lg font-semibold mt-4  text-black">Requirements</h3>
          <ul className="list-disc text-sm text-gray-700 pl-6">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Integer nec odio. Praesent libero.</li>
            <li>Sed cursus ante dapibus diam.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4  text-black">Desirable</h3>
          <ul className="list-disc text-sm text-gray-700 pl-6">
            <li>Lorem ipsum dolor sit amet, consectetur.</li>
            <li>Sed nisi. Nulla quis sem at nibh elementum.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4  text-black">Benefits</h3>
          <ul className="list-disc text-sm text-gray-700 pl-6">
            <li>Flexible work schedule.</li>
            <li>Health benefits and bonuses.</li>
          </ul>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
      {/* Salary & Location */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
        <div className="text-center md:text-left">
          <p className="text-black font-semibold">Salary (USD)</p>
          <p className="text-green-600 text-lg font-semibold">$100,000 - $120,000</p>
          <p className="text-gray-500 text-sm">Yearly salary</p>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-black font-semibold">Job Location</p>
          <p className="text-lg flex items-center justify-center text-gray-500">
            <FiMapPin className="mr-1" /> Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Job Benefits */}
      <div className="py-4">
        <h3 className="text-lg font-semibold mb-2 text-black">Job Benefits</h3>
        <div className="flex flex-wrap gap-2">
          {["401k Salary", "Async", "Learning budget", "Vision Insurance", "4 day workweek", "Profit Sharing", "Free gym membership", "Equity Compensation", "No politics at work"].map((benefit, index) => (
            <span key={index} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-lg">{benefit}</span>
          ))}
        </div>
      </div>

      {/* Job Overview */}
      <div className="py-4 border-t">
        <h3 className="text-lg font-semibold mb-2 text-black">Job Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <FaRegCalendarAlt className="mr-2 text-primary500 mb-2 text-xl" />
            <p className="text-gray-600">Job Posted:</p>
            <p className="font-semibold text-black text-sm">14 Jun, 2021</p>
          </div>
          <div className="flex flex-col">
            <FaRegClock className="mr-2 text-primary500 mb-2 text-xl" />
            <p className="text-gray-600">
              Job Expire:</p>
            <p className="font-semibold text-black text-sm">14 Aug, 2021</p>
          </div>
          <div className="flex flex-col">
            <FaBriefcase className="mr-2 text-primary500 mb-2 text-xl" />
            <p className="text-gray-600">Job Level</p>
            <p className="font-semibold text-black text-sm">14 Aug, 2021</p>
          </div>
          <div className="flex flex-col">
            <FaWallet className="mr-2 text-primary500 mb-2 text-xl" />
            <p className="text-gray-600">Experience:</p>
            <p className="font-semibold text-black text-sm">14 Aug, 2021</p>
          </div>
          <div className="flex flex-col">
            <FaGraduationCap className="mr-2 text-primary500 mb-2 text-xl" />
            <p className="text-gray-600">Education:</p>
            <p className="font-semibold text-black text-sm">14 Aug, 2021</p>
          </div>
        </div>
      </div>
      
      <div className="py-4 border-t">
        <h3 className="text-lg font-semibold mb-2 text-black">Share this job:</h3>
        <div className="flex space-x-4 items-center">
          <button className="flex items-center font-semibold text-primary500 bg-gray-100 px-3 py-2 rounded-md">
            <IoIosLink className="mr-2 " /> Copy Links
          </button>
          <FaLinkedin className="text-blue-600 text-xl cursor-pointer" />
          <FaFacebook className="text-blue-700 text-xl cursor-pointer" />
          <FaTwitter className="text-blue-400 text-xl cursor-pointer" />
          <FaEnvelope className="text-gray-500 text-xl cursor-pointer" />
        </div>
      </div>

      <div className="py-4 border-t">
        <h3 className="text-lg font-semibold mb-2 text-black">Job Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {["Back-end", "PHP", "Laravel", "Development", "Front-end"].map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg">{tag}</span>
          ))}
        </div>
      </div>
    </div>
      </div>
    </Container>
  );
}

export default JobDetails;
