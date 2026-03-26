import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { IKImage } from "imagekitio-react";

import {
  FaClock,
  FaChartLine,
  FaRulerCombined,
  FaUtensils,
  FaTools,
  FaHistory,
  FaHeadset,
  FaCalendarCheck,
} from "react-icons/fa";
import FranchiseTabs from "./FranchiseTabs";
import { MdVerified } from "react-icons/md";
import FeaturedFranchiseCategories from "../../../../../pages/FeaturedFranchiseCategories";
import CategoryQuestions from "../../../../../pages/CategoryQuestions";
import RecommendedFranchises from "../../../../../pages/RecommendedFranchises";
const IndFranchiseSport = () => {

  const [showAllInfo, setShowAllInfo] = useState(false);
  // Franchise Details
  const franchiseData = {
    logo: "/abhinay/franchise/sport-logo.png",
    name: "Five Iron Golf India",
    verified: true,
    year: "2017",
    badges: ["Trusted Seller", "Established in NYC"],
    description: "Five Iron Golf India is the country's pioneering indoor golf entertainment destination, combining cutting-edge TrackMan simulator technology with a welcoming social and hospitality-focused environment. Opening its first location in March 2023 at The Grand Venice Mall in Greater Noida, the brand brings immersive virtual golf experiences to India, complete with a full-service bar, gourmet food menu, flexible event space, and community-driven programming.",
    rating: 5,
    likes: 107,
    socialMedia: {
      youtube: "abhinay/youtube-logo.png",
      pinterest: "abhinay/pintrest-logo.png",
      instagram: "abhinay/insta-logo.png",
      twitter: "abhinay/x-logo.png",
      facebook: "abhinay/facebook-logo.png"
    },
    profileImage: "/abhinay/franchise/single/nat.jpg",
    industry: "Indoor Golf Entertainment, Leisure & Sports, Eatertainment",
    headquarters: "New York, USA (Corporate HQ); Greater Noida, India (First Indian Franchise)",
    parentCompany: "Independent brand; strategic backing from Enlightened Hospitality Investments and Callaway Golf",
    website: "www.fiveirongolf.com",
    email: "Contact via website",
    leadership: "Jared Solomon – Co-Founder & CEO (Global); Manesh Patel – CEO (India)"
  };

  const [position, setPosition] = React.useState({
    x: window.innerWidth - 100,
    y: 224,
  });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = React.useState('Business Overview');

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const images = [
    "abhinay/franchise/carousel-1.jpg",
    "abhinay/franchise/carousel-2.jpg",
    "abhinay/franchise/carousel-3.jpg",
  ];
  const franchises1 = [
    {
      name: "Wow! Momos",
      category: "Education & Training",
      image: "/abhinay/1f1.png",
    },
    {
      name: "Tea Time",
      category: "Fitness & Wellness",
      image: "/abhinay/2f2.png",
    },
    {
      name: "Amul Ice Cream",
      category: "Salon & Beauty",
      image: "/abhinay/3f3.png",
    },
    {
      name: "Subway",
      category: "Category 4",
      image: "/abhinay/4f4.png",
    },
    {
      name: "Domino’s Pizza",
      category: "Category 5",
      image: "/abhinay/5f5.png",
    },
    {
      name: "Rolfi",
      category: "Category 6",
      image: "/abhinay/6f6.png",
    },
    {
      name: "Zoca Cafe",
      category: "Category 7",
      image: "/abhinay/7f7.png",
    },
    {
      name: "Lassi Corner",
      category: "Category 8",
      image: "/abhinay/8ff8.png",
    },
  ];
  const franchises2 = [
    {
      name: "KidZee",
      category: "Education & Training",
      image: "/abhinay/unif.png",
    },
    {
      name: "Jetts India",
      category: "Fitness & Wellness",
      image: "/abhinay/second.png",
    },
    {
      name: "Lakme Salon",
      category: "Salon & Beauty",
      image: "/abhinay/third.png",
    },
    {
      name: "Carzspa",
      category: "Automotive",
      image: "/abhinay/car.png",
    },
  ];

  const insights = [
    "What is a Golf franchise in the context of Indoor Sports & Entertainment?",
    "Who is the target customer for a Golf franchise in India?",
    "What is the typical business model used by Golf franchises?",
    "What are the main services offered in a golf franchise?",
    "What kind of infrastructure or space is required for golf simulators?",
    "What is the expected investment and ROI for a golf franchise?",
    "What kind of training and support does the franchisor provide?",
    "In which locations does a golf franchise work best in India?",
  ];
  const info = [
    {
      label: "Initial Investment",
      value: "₹10L – ₹5 Cr",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/1a1.png" />,
    },
    {
      label: "Monthly Revenue",
      value: "25% – 35% annually",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/9g9.png" />,
    },
    {
      label: "Payback Period",
      value: "2-3 Years",
      icon: <FaHistory className="text-gray-400" />,
    },
    {
      label: "ROI (%)",
      value: "25-35%",
      icon: <FaChartLine className="text-gray-400" />,
    },
    {
      label: "Franchise Fees",
      value: "US$50,000",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/10h.png" />,
    },
    {
      label: "Royalties",
      value: "7%",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/12j.png" />,
    },
    {
      label: "Industry",
      value: "Indoor Golf Entertainment",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/4c4.png" />,
    },
    {
      label: "Leadership Name",
      value: "Jared Solomon",
      icon: <FaUserTie className="text-gray-400" />,
    },
    {
      label: "Parent Company",
      value: "Independent (Backed by Callaway Golf)",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/5d5.png" />,
    },
    {
      label: "Units as of 2025",
      value: "34+ (Global)",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/2a2.png" />,
    },
    {
      label: "Space requirement",
      value: "200–13,000 sq. ft.",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/3b3.png" />,
    },
    {
      label: "Term Duration",
      value: "5 Years",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/11i.png" />,
    },
    {
      label: "Staff Required",
      value: "10-15",
      icon: <IKImage path="/FranchiseHomePage/DetailsPageImages/8f8.png" />,
    },
    {
      label: "Training Program",
      value: "Available",
      icon: <FaTools className="text-gray-400" />,
    },
    {
      label: "Ongoing Support",
      value: "Included",
      icon: <FaHeadset className="text-gray-400" />,
    },
    {
      label: "Technology & Systems",
      value: "TrackMan Simulator",
      icon: <FaTools className="text-gray-400" />,
    },
    {
      label: "Contract Renewal Fee",
      value: "Negotiable",
      icon: <FaRupeeSign className="text-gray-400" />,
    },
    {
      label: "Audit/Visit Frequency",
      value: "Quarterly",
      icon: <FaCalendarCheck className="text-gray-400" />,
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Card */}
      <div className="ml-2">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
          >
            <img src="/abhinay/backer.png" alt="" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </button>
        </div>
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 relative mt-2">
        {/* Back Navigation - Top Left */}
        

        {/* Action Icons - Top Right */}
        <div className="absolute top-6 right-6 flex items-center space-x-3">
           <IKImage
                      path="FranchiseHomePage/d2.png"
                      alt="Share"
                      className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                    />
                    <IKImage
                      path="FranchiseHomePage/d3.png"
                      alt="Book"
                      className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                    />
                    <IKImage
                      path="FranchiseHomePage/d6.png"
                      alt="Menu"
                      className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                    />
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-6 w-full">
          {/* Left Section */}
          <div className="flex flex-col items-start space-x-4">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl shadow-sm overflow-hidden shrink-0">
                <img
                  src={franchiseData.logo}
                  alt={`${franchiseData.name} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold flex items-center">
                    {franchiseData.name}
                    {franchiseData.verified && (
                      <MdVerified className="text-blue-500 text-xl ml-2 shrink-0" />
                    )}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                  {franchiseData.year && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">
                      {franchiseData.year}
                    </span>
                  )}
                  {franchiseData.industry && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">
                      {franchiseData.industry}
                    </span>
                  )}
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    {franchiseData.verified ? "Trusted Seller" : "Verified Brand"}
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    34+ Outlets
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-700 mt-3 text-sm md:text-base max-w-2xl">
                {franchiseData.description}
              </p>
              <div className="flex flex-wrap space-x-3 mt-4">
                <button className="bg-[#4A53FA] text-white px-12 py-3 rounded-[25px] hover:bg-indigo-700 w-full sm:w-auto">
                  Follow
                </button>
                <button className="bg-gray-100 text-gray-800 px-12 py-3 rounded-[25px] font-medium hover:bg-gray-200 w-full sm:w-auto">
                  Enquiry
                </button>
              </div>
              <div className="flex items-center mt-3 space-x-1 text-yellow-500">
                {[...Array(franchiseData.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
                <span className="text-gray-600 text-sm ml-2">{franchiseData.likes} likes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons - Bottom Right */}
        <div className="absolute bottom-6 right-6">
          <div className="flex items-center space-x-3 text-xl text-gray-600">
            <img src={franchiseData.socialMedia.youtube} alt="" className="w-5 h-5" />
            <img src={franchiseData.socialMedia.pinterest} alt="" className="w-5 h-5" />
            <img src={franchiseData.socialMedia.instagram} alt="" className="w-5 h-5" />
            <img src={franchiseData.socialMedia.twitter} alt="" className="w-5 h-5" />
            <img src={franchiseData.socialMedia.facebook} alt="" className="w-5 h-5" />
          </div>
        </div>

        {/* Floating Profile Image */}
        <div
          className="fixed z-50"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="relative">
            <img
              src={franchiseData.profileImage}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-gray-300 shadow-lg hover:scale-110 transition-transform select-none"
              draggable="false"
            />
            <img 
              className="w-6 h-6 rounded-full absolute -bottom-0.5 -right-0.5 bg-white border border-gray-200" 
              src="/abhinay/caller.png" 
              alt="" 
            />
          </div>
        </div>
      </div>

      {/* Image Scroll Section */}
      <div className="relative overflow-hidden py-3">
        <style>
          {`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-scroll {
              display: flex;
              animation: scroll 20s linear infinite;
            }
            
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="flex space-x-4 animate-scroll mt-8">
          {images.concat(images).map((img, idx) => (
            <div
              key={idx}
              className="shrink-0 w-80 sm:w-[410px] h-52 sm:h-60 rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={img}
                alt={`kathi ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Franchising overview
        </h2>
        <p className="text-gray-500 text-center mt-1 mb-6 text-sm sm:text-base">
          An Overview of Franchise Systems and Operations
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {(showAllInfo ? info : info.slice(0, 12)).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-7 py-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
            >
              <div className="">
                <p className="text-gray-500 text-sm">{item.label}</p>
                <p className="text-indigo-600 font-medium text-base sm:text-lg">
                  {item.value}
                </p>
              </div>
              <div className="text-gray-400 text-lg w-8 h-8 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => setShowAllInfo(!showAllInfo)}
            className="text-indigo-500 font-medium hover:underline flex items-center gap-1 mx-auto"
          >
            {showAllInfo ? "View less ↑" : "View more →"}
          </button>
        </div>
      </div>

      <FranchiseTabs />
      {/*
       */}
      <div className="w-full px-6 py-10 bg-white">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left side - Franchise categories */}
          <div className="flex-1">
            <FeaturedFranchiseCategories
              title="Featured golf franchise categories"
              data={franchises1} // Using the local static data for now
              showViewMore={true}
            />
          </div>

          {/* Right side - Insights/Questions */}
          <div className="lg:w-[460px] sticky top-24">
            <CategoryQuestions 
              data={insights} 
            />
          </div>
        </div>
      </div>
<div className="w-full px-6 py-10 bg-white border-t border-gray-100">
  <div className="mb-16">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommended Golf Franchises</h2>
        <p className="text-gray-500 max-w-2xl text-sm sm:text-base">
          Discover top-rated franchises handpicked based on your preferences and
          investment range. Explore high-potential businesses that are expanding fast.
        </p>
      </div>
      <button className="text-[#4A53FA] text-sm font-bold hover:underline flex items-center gap-1.5 shrink-0 mb-1">
        View more <span className="text-lg">→</span>
      </button>
    </div>
    <RecommendedFranchises />
  </div>

  {/* Disclaimer */}
  <div className="mt-12 pt-8 border-t border-gray-100">
    <p className="text-xs text-gray-400 leading-relaxed italic">
      <strong>Disclaimer:</strong> LeMiCi IQ is an integrated franchise solution
      company since 2025 and an absolute authority on franchising and licensing.
      FIHL (www.lemici.com) and the site sponsors accept no liability for the
      accuracy of any information contained on this site or other linked sites.
      We recommend you take advice from a lawyer, accountant, and franchise
      consultant experienced in franchising before you commit yourself. It is
      the user's responsibility to verify accuracy and reliability. Please read
      the{" "}
      <a href="#" className="text-blue-500 hover:underline active:text-blue-700 transition-colors">
        terms & condition
      </a>
      .
    </p>
  </div>
</div>
    </div>
  );
};

export default IndFranchiseSport;

