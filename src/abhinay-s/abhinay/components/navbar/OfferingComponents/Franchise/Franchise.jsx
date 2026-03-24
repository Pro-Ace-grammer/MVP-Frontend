import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IKImage } from "imagekitio-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FcardGrid } from "./Fcard";
import {
  FaCar,
  FaUserTie,
  FaTruck,
  FaUtensils,
  FaHeartbeat,
  FaBook,
  FaStore,
} from "react-icons/fa";
import { GiScissors } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import Svg from "./Svg";
import LogoRow from "./LogoRow.jsx";
import {
  Bus,
  Search,
  User,
  Eye,
  Filter,
  Settings,
  Menu,
  X,
  Bot,
  UserCircle,
  Minimize2,
  TrendingUp,
  MapPin,
  Users,
  Building,
  Clock,
  Star,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Opp from "./Opp";
import Single from "./Single";
import { Toaster, toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ChartRenderer,
  parseChartData,
  removeChartDataBlocks,
} from "../../../../../components/ChartRenderer";
// import { generateFranchiseAdvice } from '@/lib/ai.js';
import { streamFranchiseAdvice } from "../../../../../lib/ai.js";
import ChatbotSub from "../../../../../utils/ChatbotSub.jsx";
import { getFranchiseData, getFranchiseFlags } from "@/abhinay-s/lib/api";
import PopularListing from "./PopularListing.jsx";
import IndustryPills from "./IndustryPills.jsx";
import ShowStats from "./ShowStats.jsx";
import { fetchFranchiseHome } from "../../../../../lib/api.js";
import TopFranchiseOpportunities from "./TopFranchiseOpportunities.jsx";
import DistributionCategories from "./DistributionCategories.jsx";
import Cities from "./Cities.jsx";
import ExploreByCategories from "./ExploreByCategories.jsx";
import { useChatbot } from "../../../../ChatbotContext.jsx";
import FloatingChatbot from "../../../../FloatingChatbot.jsx";
import Chatlisting from "./Chatlisting.jsx";

// Insights import was unused; removed to avoid lint warnings
export default function Franchise() {
      const { showChatbot, setShowChatbot } = useChatbot();
    
  //order is so important here
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const questionFromUrl = queryParams.get('question') || "";
  const autoSubmit = queryParams.get('autoSubmit') === 'true';

  const categories = [
    { name: "Automobiles", icon: <FaCar /> },
    { name: "Beauty & salon", icon: <GiScissors /> },
    { name: "Business", icon: <FaUserTie /> },
    { name: "Dealers & Distribution", icon: <FaTruck /> },
    { name: "Food", icon: <FaUtensils /> },
    { name: "Health and Wellness", icon: <FaHeartbeat /> },
    { name: "Education", icon: <FaBook /> },
    { name: "Retail", icon: <FaStore /> },
    { name: "Courier Logistics", icon: <MdLocalShipping /> },
  ];

  // Data & flags loaded via centralized API client

  const [data, setData] = useState({
    industries: [],
    cities: [],
    stats: [],
    items: [],
  });

  const [showIndustryPills, setShowIndustryPills] = useState(true);
  const [showcities, setShowCities] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [popularListing, setPopularListing] = useState(true);




  useEffect(() => {
    const load = async () => {
      try {
        const [dataResp, flags] = await Promise.all([
          getFranchiseData(),
          getFranchiseFlags(),
        ]);

        setData({
          industries: dataResp.industries || [],
          cities: dataResp.cities || [],
          stats: dataResp.stats || [],
          items: dataResp.items || [],
        });

        if (typeof flags.popularListing === "boolean") {
          setPopularListing(flags.popularListing);
        }
        if (typeof flags.showIndustryPills === "boolean") {
          setShowIndustryPills(flags.showIndustryPills);
        }
        if (typeof flags.showStats === "boolean") {
          setShowStats(flags.showStats);
        }
      } catch (err) {
        console.error("Franchise API failed", err);
      }
    };

    load();
  }, []);

  const tabs1 = ["Franchise", "Brand Leasing", "Dealer", "Super Stockist"];
  const [activeTab1, setAtiveTab1] = useState("Franchise");
  const [logoRowData, setLogoRowData] = useState(null);
  const [topFranchiseData, setTopFranchiseData] = useState(null);
const [popularListingsnew, setPopularListingsnew] = useState([]);
const [distributionData, setDistributionData] = React.useState(null);
const [citiesData, setCitiesData] = useState(null);
const [exploreCategoriesData, setExploreCategoriesData] = useState(null);
  const [showAll, setShowAll] = useState(false);

useEffect(() => {
  fetchFranchiseHome()
    .then((res) => {
      // The API response structure changed; we now expect res.data.sections directly
      if (!res || !res.data) return;

      const sections = res.data?.sections || [];
      // HERO
      const heroSection = sections.find((s) => s.type === "hero" && s.enabled);
      if (heroSection) {
        setLogoRowData(heroSection.data);
      }

      // TOP FRANCHISE OPPORTUNITIES
      const topFranchiseSection = sections.find(
        (s) => s.type === "top_franchise_opportunities" && s.enabled
      );
      if (topFranchiseSection) {
        setTopFranchiseData(topFranchiseSection.data);
      }
      // POPULAR LISTINGS
      const popularListingSection = sections.find(
        (s) => s.type === "popular_listings" && s.enabled
      );
      if (popularListingSection) {
        setPopularListingsnew(popularListingSection.data);
      }
    //   console.log(popularListingSection.data)
      // DISTRIBUTION CATEGORIES
      const distributionSection = sections.find(
        (s) => s.type === "distribution_categories" && s.enabled
      );
      if (distributionSection) {
        setDistributionData(distributionSection.data);
      }

      // CITIES ✅
      const citiesSection = sections.find((s) => s.type === "cities" && s.enabled);
      if (citiesSection) {
        setCitiesData(citiesSection.data);
      }

      // EXPLORE BY CATEGORIES
      const exploreCategoriesSection = sections.find(
        (s) => s.type === "explore_by_categories" && s.enabled
      );
      if (exploreCategoriesSection) {
        setExploreCategoriesData(exploreCategoriesSection.data);
      }
    })
    .catch((err) => {
      console.error("Error fetching franchise home data:", err);
    });
}, []);

  const categoriesp = [
    { label: "Automobiles", icon: "🚗" },
    { label: "Beauty & Salon", icon: "🌸" },
    { label: "Business", icon: "👤" },
    { label: "Food", icon: "🍴" },
    { label: "Health & Wellness", icon: "❤️" },
    { label: "Dealers & Distribution", icon: "🚚" },
    { label: "Education", icon: "🎓" },
    { label: "Retail", icon: "🏬" },
    { label: "Courier Logistics", icon: "📦" },
    { label: "View All", icon: "⋯" },
  ];

  const indust = [
    {
      name: "Restaurant Franchise",
      path: "/FranchiseHomePage/icons/1.svg",
    },
    {
      name: "Business professional",
      path: "/FranchiseHomePage/icons/2.svg",
    },
    {
      name: "Business opportunities",
      path: "/FranchiseHomePage/icons/3.svg",
    },
    {
      name: "Cleaning Franchise",
      path: "/FranchiseHomePage/icons/19.svg",
    },
    {
      name: "Property & Real estate",
      path: "/FranchiseHomePage/icons/17.svg",
    },
    {
      name: "Education franchise",
      path: "/FranchiseHomePage/icons/14.svg",
    },
    {
      name: "Health care franchise",
      path: "/FranchiseHomePage/icons/7.svg",
    },
    {
      name: "Home based franchise",
      path: "/FranchiseHomePage/icons/8.svg",
    },
    {
      name: "Home services franchise",
      path: "/FranchiseHomePage/icons/9.svg",
    },
    {
      name: "Fitness franchise",
      path: "/FranchiseHomePage/icons/10.svg",
    },
    {
      name: "Retail franchise",
      path: "/FranchiseHomePage/icons/11.svg",
    },
    {
      name: "Franchise services provider",
      path: "/FranchiseHomePage/icons/12.svg",
    },
    {
      name: "Pet franchise",
      path: "/FranchiseHomePage/icons/13.svg",
    },
    {
      name: "Health & beauty",
      path: "/FranchiseHomePage/icons/14.svg",
    },
    {
      name: "Fast food franchise",
      path: "/FranchiseHomePage/icons/15.svg",
    },
    {
      name: "Golf franchise",
      path: "/FranchiseHomePage/icons/16.svg",
    },
    {
      name: "Computer & internet",
      path: "/FranchiseHomePage/icons/17.svg",
    },
    {
      name: "Food franchise",
      path: "/FranchiseHomePage/icons/18.svg",
    },
  ];
 
  return (
    <div>
      <div className="w-full px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        <div className="mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <h1
              className="mb-3 sm:mb-2 font-bold leading-tight tracking-tight text-3xl sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "Space Grotesk" }}
            >
              Discover <span className="text-[#4A53FA]">Franchise</span> And{" "}
              <span className="hidden sm:inline">
                <br />
              </span>
              <span className="text-[#4A53FA]">Dealership</span> Opportunities
            </h1>
          </div>

          {/* Tabs1 */}
          <div className="flex gap-3 bg-white p-2 rounded-full w-fit mx-auto text-center mb-3">
            {tabs1.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab1(tab)}
                className={`px-5 py-2 text-sm font-semibold rounded-[16px] transition-all duration-200
            ${
              activeTab1 === tab
                ? "bg-[#4A53FA] text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          {/* <h1>hi</h1> */}
          {/* <ChatbotSub
            placeholder="Ask about franchises (e.g., 'suggest biryani franchise in Ghaziabad with 20% ROI')"
            context="franchise"
            initialQuery={questionFromUrl}
            autoSubmit={autoSubmit}
          /> */}

          <Chatlisting />

          {/* Subtext */}
          <p className="text-sm sm:text-md text-gray-500 mt-3 sm:mt-4 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
            Find, Compare, and connect with the best franchise opportunities
            across Industries.
          </p>

          {/* Logo Row */}

          {logoRowData && <LogoRow data={logoRowData} />}
        </div>
      </div>
      
          
        {topFranchiseData && <TopFranchiseOpportunities data={topFranchiseData} />}
      

      {popularListingsnew && (
            <PopularListing data={popularListingsnew} />
            )}


      <div className="max-w-7xl mx-auto px-6 py-12">
        
        
        {exploreCategoriesData && (
          <ExploreByCategories daata={exploreCategoriesData} />
        )}


      </div>
      
      {/* Floating Chatbot */}
        {showChatbot && (
          //                     <div className="fixed inset-10 z-50 flex items-end justify-center pointer-events-none">
          //                         <div className="pointer-events-auto bg-white rounded-t-3xl shadow-3xl w-full max-w-2xl mb-0 animate-slide-up relative">
          //                             {/* Close Button - Positioned to the right */}
          //                             <button
          //                                 onClick={() => setShowChatbot(false)}
          //                                 className="absolute -right-12 top-6 p-2 bg-white hover:bg-gray-100 rounded-full transition-colors shadow-lg"
          //                             >
          //                                 <X className="w-5 h-5 text-gray-600" />
          //                             </button>

          //                             {/* Chatbot Content */}

          //                             {/* Input Container */}
          //                             <div
          //   className="
          //     flex items-center gap-2
          //     border-2 border-gray-200 rounded-xl
          //     px-4 py-3
          //     bg-white
          //     shadow-[0_0_12px_#6D3E93]/40
          //     hover:shadow-[0_0_16px_#6D3E93]/60
          //     transition-all duration-300
          //   "
          // >

          //                                 <input
          //                                     type="text"
          //                                     value={query}
          //                                     onChange={(e) => setQuery(e.target.value)}
          //                                     onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          //                                     placeholder="Ask me anything..."
          //                                     className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
          //                                 />

          //                                 {/* Microphone Button */}
          //                                 <button
          //                                     onClick={toggleListening}
          //                                     disabled={!speechSupported}
          //                                     title={
          //                                         speechSupported
          //                                             ? isListening
          //                                                 ? 'Listening… click to stop'
          //                                                 : 'Speak your query'
          //                                             : 'Voice input not supported'
          //                                     }
          //                                     className={`rounded-md p-1 transition-colors ${isListening ? 'bg-red-100' : 'bg-transparent'
          //                                         } ${!speechSupported
          //                                             ? 'opacity-50 cursor-not-allowed'
          //                                             : 'cursor-pointer'
          //                                         }`}
          //                                 >
          //                                     <svg
          //                                         width="14"
          //                                         height="20"
          //                                         viewBox="0 0 14 20"
          //                                         fill="none"
          //                                         xmlns="http://www.w3.org/2000/svg"
          //                                     >
          //                                         <path
          //                                             d="M7 19V16.5455M7 16.5455C5.4087 16.5455 3.88258 15.8558 2.75736 14.6283C1.63214 13.4008 1 11.736 1 10M7 16.5455C8.5913 16.5455 10.1174 15.8558 11.2426 14.6283C12.3679 13.4008 13 11.736 13 10M7 14.0909C4.9375 14.0909 3.25 12.3138 3.25 10.1407V4.95018C3.25 2.77709 4.9375 1 7 1C9.0625 1 10.75 2.77709 10.75 4.95018V10.1407C10.75 12.3138 9.0625 14.0909 7 14.0909Z"
          //                                             stroke={isListening ? '#ef4444' : 'black'}
          //                                             strokeOpacity={isListening ? '0.8' : '0.3'}
          //                                             strokeWidth="1.5"
          //                                             strokeLinecap="round"
          //                                             strokeLinejoin="round"
          //                                         />
          //                                     </svg>
          //                                 </button>

          //                                 {/* Send Button */}
          //                                 <button onClick={handleSubmit} className="hover:scale-110 transition-transform">
          //                                     <div className="w-6 h-6 bg-white rounded-sm opacity-90 flex items-center justify-center cursor-pointer">
          //                                         <img src="/abhinay/HomePageImages/cube.png" alt="send" />
          //                                     </div>
          //                                 </button>
          //                             </div>

          //                         </div>
          //                     </div>
          <FloatingChatbot />
        )}  
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#4A53FA] rounded-2xl flex flex-col md:flex-row items-center justify-between p-8 md:p-12 mb-8">
          {/* Left Content */}
          <div className="max-w-md text-white">
            <h2 className="text-2xl md:text-3xl font-bold">
              Be Your Own Boss Today!
            </h2>
            <p className="text-sm text-white/80 mt-3">
              Step into success with a franchise or dealership. The future of
              business is in your hands.
            </p>

            <button 
              className="mt-5 bg-white text-black px-6 py-2.5 rounded-2xl text-sm font-semibold hover:bg-gray-100 transition"
              onClick={() => navigate('/Individual-listingpage')}
            >
              Start Exploring
            </button>
          </div>

          {/* Right Image */}
          <div className="mt-6 md:mt-0">
            <IKImage
              path="/FranchiseHomePage/beboss.jpg"
              alt="CTA"
              className="w-[320px] h-[180px] object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
        <IKImage
          path="FranchiseHomePage/4cards.png"
          alt="CTA"
          className="w-full h-auto object-contain rounded-xl mt-16"
          loading="lazy"
        />

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Big Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#5B5FFF] to-[#4A53FA] rounded-2xl p-8 md:p-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                How LeMiCi Can Help Your <br /> Business Thrive
              </h2>

              <p className="text-sm md:text-base text-white/90 mt-4 max-w-xl">
                LeMiCi is your one-stop platform for discovering, evaluating,
                and expanding with franchise and dealership opportunities.
                Whether you're a first-time entrepreneur or an established
                business, we make scaling smarter and easier.
              </p>

              <button className="mt-6 bg-white text-black px-6 py-2.5 rounded-2xl text-sm font-semibold hover:bg-gray-100 transition">
                Register for free
              </button>
            </div>

            {/* Right Small Card */}
            <div className=" border border-gray-200 rounded-2xl p-6 flex flex-col justify-between text-center">
              <div>
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <IKImage
                    path="/FranchiseHomePage/eccr.png"
                    alt="CTA"
                    className="w-12 h-12 object-contain"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  List Your <br />
                  Franchise/Distributorship to <br />
                  Expand Your Reach
                </h3>

                <p className="text-sm text-gray-500 mt-3">
                  Connect with potential buyers and grow your network.
                </p>
              </div>

              <button className="mt-6 bg-[#4F5BFF] text-white py-2.5 rounded-2xl text-sm font-semibold hover:bg-[#3E43E0] transition">
                Register for free
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 mb-8">
        <p className="text-center text-black text-3xl font-bold">
          Explore Franchises by Cities
        </p>
        <h1 className="text-lg mt-2 text-center text-[#615E63]">
          Discover prime franchise opportunities across India&apos;s fastest-growing urban hubs.
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 lg:gap-20 mt-6">
          {data.cities.map((city) => (
            <div 
              key={city.id} 
              className="text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/franchise/searchlistingpage?query=Franchises in ${city.label}`)}
            >
              <div className="w-full aspect-square h-32 rounded-[20px] overflow-hidden">
                <IKImage
                  path={`/${city.icon}`}
                  alt={city.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-[#4A53FA] text-sm sm:text-base font-medium mt-2 capitalize">
                {city.label}
              </p>
            </div>
          ))}
        </div>
<p className="text-blue-600 text-sm mt-6 cursor-pointer text-center">
        View More →
      </p>
        <div className="w-full flex justify-end">
          <button
            className="border p-2 rounded-xl text-sm border-2 border-gray-300 font-semibold mt-16 hover:underline"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            Back to top
          </button>
        </div>
      </div>
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 mb-20">
        {/* Show Stats*/}
        {showStats && <ShowStats stats={data.stats} />}
      </div>
      {/* <div className="w-full flex items-center justify-center gap-3 my-8">
        <NavLink
          to="/franchise/oppurtunties"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full border shadow-sm ${
              isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700"
            }`
          }
          aria-label="Go to Franchise Opportunities"
        >
          1
        </NavLink>
        <NavLink
          to="/newFranchise1"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full border shadow-sm ${
              isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700"
            }`
          }
          aria-label="Go to Franchise Details"
        >
          2
        </NavLink>
        <NavLink
          to="/franchise/category"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full border shadow-sm ${
              isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700"
            }`
          }
          aria-label="Go to Business Categories"
        >
          3
        </NavLink>
      </div> */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          aria-label="Open chat"
          className="fixed left-4 bottom-6 md:left-6 md:bottom-8 z-50 pointer-events-auto bg- rounded-full p-2 hover:shadow-2xl transition transform hover:scale-105"
        >
          <img
            src="/abhinay/HomePageImages/kube.png"
            alt="Open chat"
            className="w-12 h-12 rounded-full border-5 border-[#9876b3] p-1 object-cover"
          />
        </button>
      )}
    </div>
  );
}












