import React, { useState, useRef, useEffect } from "react";
import { IKImage } from "imagekitio-react";
import NewChatbot from "./NewChatbot";
import { Usables1, Usables2, Usables3 } from "../utils/Usables";
import { PieChart, Expand, Puzzle } from "lucide-react";
import { X } from "lucide-react";
import Footer from "@/hari/components/LemiciHomeComponents/Connect/Footer";
import FloatingChatbot from "./FloatingChatbot";
import { useChatbot } from "./ChatbotContext";
// import { getHomeMetrics } from "@/abhinay-s/lib/api";
const GlowBackground = ({ brightness = 0.4 }) => {
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: '#ffffff', // Base background color
    overflow: 'hidden',
    zIndex: -1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const blobBaseStyle = {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(60px)', // This creates the "soft" feel
    opacity: brightness,
    width: '220px',
    height: '220px',
  };

  return (
    <div style={containerStyle}>
      {/* Purple Blob */}
      <div style={{
        ...blobBaseStyle,
        background: '#6D3E93',
        top: '10%',
        left: '35%',
      }} />

      {/* Teal Blob */}
      <div style={{
        ...blobBaseStyle,
        background: '#14A79D',
        top: '5%',
        left: '50%',
      }} />

      {/* Yellow Blob */}
      <div style={{
        ...blobBaseStyle,
        background: '#F4B400',
        top: '15%',
        left: '45%',
      }} />
    </div>
  );
};

/* Draggable Chat Button Helper */
const DraggableChatButton = ({ onClick }) => {
  const [position, setPosition] = React.useState({ x: 24, y: 32 }); // Bottom-left default
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartPos = React.useRef({ x: 0, y: 0 });
  const buttonPosAtStart = React.useRef({ x: 0, y: 0 });
  const hasMoved = React.useRef(false);

  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    hasMoved.current = false;
    dragStartPos.current = { x: clientX, y: clientY };
    buttonPosAtStart.current = { x: position.x, y: position.y };
  };

  const onDrag = React.useCallback((clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - dragStartPos.current.x;
    const dy = clientY - dragStartPos.current.y;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasMoved.current = true;
    }

    // Update position - x is from left, y is from bottom
    const newX = Math.max(0, Math.min(window.innerWidth - 64, buttonPosAtStart.current.x + dx));
    const newY = Math.max(0, Math.min(window.innerHeight - 64, buttonPosAtStart.current.y - dy));

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const endDrag = React.useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (!hasMoved.current) {
        onClick();
      }
    }
  }, [isDragging, onClick]);

  // Global mouse/touch events
  React.useEffect(() => {
    const handleMouseMove = (e) => onDrag(e.clientX, e.clientY);
    const handleTouchMove = (e) => onDrag(e.touches[0].clientX, e.touches[0].clientY);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', endDrag);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isDragging, onDrag, endDrag]);

  return (
    <button
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      aria-label="Open chat"
      className="fixed z-[9999] pointer-events-auto rounded-full p-2 hover:shadow-2xl transition transform hover:scale-105 active:scale-95 touch-none"
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'transform 0.2s, box-shadow 0.2s, left 0.1s, bottom 0.1s'
      }}
    >
      <img
        src="/abhinay/HomePageImages/kube.png"
        alt="Open chat"
        className="w-12 h-12 rounded-full border-5 border-[#9876b3] p-1 object-cover pointer-events-none select-none"
      />
    </button>
  );
};


const PilotProgramSection = ({ showPricing, pricingInfo }) => {
  const [billing, setBilling] = useState("monthly");
  const [activeAudience, setActiveAudience] = useState("Startups");

  /* Inline Card component */
  const Card = ({ children, accent, iconBg, outline }) => {
    if (accent) {
      return (
        <div className={`relative overflow-hidden rounded-2xl p-6 ${accent}`}>
          <div
            className={`absolute right-4 top-4 h-14 w-14 rounded-xl ${iconBg || "bg-white/10"
              }`}
          />
          <div className="relative">{children}</div>
        </div>
      );
    }

    return (
      <div
        className={`rounded-2xl p-6 ${outline ? "border border-slate-200" : ""
          }`}
      >
        {children}
      </div>
    );
  };

  return (
    <section className="w-full bg-white text-slate-900">
      <div className="mx-auto max-w-7xl py-10 lg:py-14">
        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          {/* Left: heading + copy + CTA */}
          <div>
            <h1 className="text-[3.6rem] font-extrabold leading-tight tracking-tight">
              Join Our Pilot
              <br />
              Program
            </h1>

            <p className="mt-10 max-w-2xl text-slate-600">
              Be among the first to harness the transformative power of LeMiCi.
              Our pilot offers unparalleled access to cutting‑edge market
              research data and deep economic insights. Drive innovation and
              make truly informed decisions with comprehensive support, keeping
              you decisively ahead in the Indian B2B landscape.
            </p>

            <button
              type="button"
              className="mt-10 inline-flex items-center rounded-[16px] bg-[#6D3E93] px-10 py-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Apply now
            </button>
          </div>

          {/* Right: Entirely Scrollable Column */}
          <div className="flex flex-col gap-6 h-full max-h-[420px] overflow-y-auto custom-scrollbar pr-4">
            {/* Offer Card */}
            <div className="rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 lg:p-7 bg-[#EDEDED]">
              <div className="flex items-center justify-between">
                <p className="font-medium">Pilot program offer</p>

                {/* Billing toggle */}
                <div className="relative flex bg-slate-100 rounded-full p-1 text-sm">
                  <button
                    onClick={() => setBilling("monthly")}
                    className={`px-3 py-1.5 rounded-full transition-colors ${billing === "monthly"
                      ? "bg-white shadow text-slate-900"
                      : "text-slate-600"
                      }`}
                    aria-pressed={billing === "monthly"}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBilling("yearly")}
                    className={`px-3 py-1.5 rounded-full transition-colors ${billing === "yearly"
                      ? "bg-white shadow text-slate-900"
                      : "text-slate-600"
                      }`}
                    aria-pressed={billing === "yearly"}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              {showPricing && pricingInfo && (
                <>
                  <div className="mt-5 text-[23px]">
                    <span
                      className="text-[#6D3E93] font-inter font-semibold"
                    >
                      Sign up for the Pilot program now
                    </span>

                    <span className="font-inter font-bold">
                      &nbsp;&amp; get an <br />
                      exclusive {pricingInfo.discountPercentage}% discount on
                      your <br />
                      subscription
                    </span>
                  </div>

                  <div className="mt-6 flex items-end gap-3 justify-between">
                    <p className="mt-2 text-slate-600 text-sm">
                      Cost - ( {billing === "monthly" ? "999 / month" : "11,988 / year"})
                    </p>

                    <span className="text-3xl sm:text-4xl font-extrabold text-[#6D3E93]">
                      FREE <br />
                      <span className="text-slate-400 line-through text-sm">
                        ₹{pricingInfo.originalPrice}
                      </span>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Benefits List */}
            <div className="flex-1 space-y-6">
              {[
                {
                  title: "Exclusive Access",
                  desc: "Early access to 10,000+ cutting‑edge technologies from leading sources across India.",
                  icon: <div className="h-6 w-6 text-[#6D3E93]"><IKImage path="/HomePageImage/exclusive_access.png" alt="" loading="lazy" /></div>
                },
                {
                  title: "Personalized support",
                  desc: "Tailored technology matching, business plan creation, and interaction with legal experts, investors, and accelerators.",
                  icon: <div className="h-6 w-6 text-[#6D3E93]"><IKImage path="/HomePageImage/personalized_support.png" alt="" loading="lazy" /></div>
                },
                {
                  title: "Intelligent search and management",
                  desc: "Search technologies by interest, create lists, get notification about new technologies and easily manage your technological interests.",
                  icon: <div className="h-6 w-6 text-[#6D3E93]"><IKImage path="/HomePageImage/intel_search.png" alt="" loading="lazy" /></div>
                },
                {
                  title: "Analysis and planning",
                  desc: "In-depth analysis, implementation plans, and steps for successful commercialization.",
                  icon: <div className="h-6 w-6 text-[#6D3E93]"><IKImage path="/HomePageImage/analysis.png" alt="" loading="lazy" /></div>
                },
                {
                  title: "Business development and growth",
                  desc: "Comprehensive support from company registration to scaling, including educational resources.",
                  icon: <div className="h-6 w-6 text-[#6D3E93]"><IKImage path="/HomePageImage/busi_dev.png" alt="" loading="lazy" /></div>
                },
                {
                  title: "Networking opportunities",
                  desc: "Establish connection with entrepreneurs, corporations, and resources providers.",
                  icon: <div className="h-6 w-6 text-[#6D3E93]"><IKImage path="/HomePageImage/network_opp.png" alt="" loading="lazy" /></div>
                }
              ].map((benefit, i) => (
                <div key={i}>
                  <div className="flex items-start gap-5">
                    <div className="mt-1 flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <p className="font-bold text-[#6D3E93] text-lg">
                        {benefit.title}
                      </p>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                  {i < 5 && <hr className="mt-6 border-slate-200" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audience tiles */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: "Startups",
              items: ["Gain clarity, fuel your growth.", "Data‑driven decisions for rapid scaling."],
              icon: "/HomePageImage/startups.png"
            },
            {
              title: "SMEs",
              subtitle: "(Small‑Medium Enterprises)",
              items: ["Optimize operations, enhance profitability.", "Smart insights for sustainable business expansion."],
              icon: "/HomePageImage/smes.png"
            },
            {
              title: "Researchers",
              items: ["Access comprehensive, reliable data.", "Deepen analysis, validate your findings."],
              icon: {
                white: "/HomePageImage/researchers_white.png",
                purple: "/HomePageImage/researchers_purp.png?updatedAt=1773511370383"
              }
            },
            {
              title: "Educators",
              items: ["Empower learning with reliable data.", "Enhance curriculum, foster critical thinking."],
              icon: "/HomePageImage/educators.png"
            }
          ].map((item, idx) => {
            const isActive = activeAudience === item.title;
            const isResearchers = item.title === "Researchers";

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveAudience(item.title)}
                className={`rounded-[28px] p-10 transition-all duration-300 cursor-pointer border-2 ${isActive
                  ? "bg-[#6D3E93] text-white border-[#6D3E93] shadow-xl"
                  : "bg-white text-slate-900 border-slate-100 hover:border-slate-200"
                  }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 flex items-center justify-center relative">
                    {isResearchers ? (
                      <>
                        <IKImage
                          path={item.icon.white}
                          alt={`${item.title} white`}
                          className={`h-full w-auto object-contain absolute inset-0 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                          loading="lazy"
                        />
                        <IKImage
                          path={item.icon.purple}
                          alt={`${item.title} purple`}
                          className={`h-full w-auto object-contain absolute inset-0 transition-opacity duration-200 ${!isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                          loading="lazy"
                        />
                      </>
                    ) : (
                      <IKImage
                        path={item.icon}
                        alt={item.title}
                        className="h-full w-auto object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
                  {isActive && (
                    <div className="opacity-20">
                      {/* Optional: Add the background decorative icon seen in Figma for Startups */}
                      {item.title === "Startups" && (
                        <div className="absolute right-10 top-10 pointer-events-none">
                          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" d="M20 10V20M20 10H10M20 10C25 10 30 15 30 20M80 10V20M80 10H90M80 10C75 10 70 15 70 20M20 90V80M20 90H10M20 90C25 90 30 85 30 80M80 90V80M80 90H90M80 90C75 90 70 85 70 80" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <circle opacity="0.3" cx="50" cy="50" r="15" stroke="white" strokeWidth="4" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <h3 className={`font-inter font-bold text-4xl mb-4 ${isActive ? "text-white" : "text-slate-900"}`}>
                  {item.title}
                  {item.subtitle && (
                    <span className={`text-xl ml-2 font-normal ${isActive ? "text-purple-200" : "text-slate-500"}`}>
                      {item.subtitle}
                    </span>
                  )}
                </h3>

                <ul className={`space-y-2 list-disc ml-5 ${isActive ? "text-purple-100" : "text-slate-600"}`}>
                  {item.items.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-lg">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const NewHomePage = () => {
  const { showChatbot, setShowChatbot } = useChatbot();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize speech recognition

  const [cards1, setCards1] = useState([
    {
      bg: "bg-[#6D3E93]",
      items: [
        { number: "362K+", label: "Companies" },
        { number: "334K+", label: "Unfunded" },
        { number: "66.9K+", label: "Investors" }
      ]
    },
    {
      bg: "bg-[#14A79D]",
      items: [
        { number: "28.2K+", label: "Funded" },
        { number: "115+", label: "Unicorns" },
        { number: "620+", label: "Reports" }
      ]
    },
    {
      bg: "bg-[#F4B400]",
      items: [
        { number: "2.6K+", label: "Series A+" },
        { number: "39.1K+", label: "Funding Rounds" },
        { number: "47.6K+", label: "Financials" }
      ]
    },
    {
      bg: "bg-[#4E5BFF]",
      items: [
        { number: "805+", label: "Series C+" },
        { number: "4.7K+", label: "Acquisitions" },
        { number: "25.7K+", label: "Cap Tables" }
      ]
    }
  ]);
  const [pricingInfo, setPricingInfo] = useState({
    discountPercentage: 20,
    originalPrice: "5,000"
  });
  const [lovedByCount, setLovedByCount] = useState("1200+");

  // Flags (default TRUE as per your rules)
  const [showCards, setShowCards] = useState(true);
  const [showLovedBy, setShowLovedBy] = useState(true);
  const [showPricing, setShowPricing] = useState(true);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-IN";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      setSpeechSupported(true);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      console.log("Query submitted:", query);
      // Add your submit logic here
    }
  };
  const [activeTab, setActiveTab] = useState("Data");

  const tabs = ["Data", "Matchmaking", "Research", "Network", "Consulting"];

  const features1 = [
    {
      title: "Verified Database",
      desc: "Access to thoroughly verified and up-to-date information",
      icon: "/HomePageImage/verifieddstsbse.png",
    },
    {
      title: "Comprehensive Information",
      desc: "Complete data sets with detailed business insights",
      icon: "/HomePageImage/cii.png",
    },
    {
      title: "Targeted Reach",
      desc: "Precisely targeted data to reach your ideal audience",
      icon: "/HomePageImage/targetedresearch.png",
    },
    {
      title: "Lead Generation",
      desc: "Powerful tools to generate qualified leads efficiently",
      icon: "/HomePageImage/rocket.png",
    },
    {
      title: "Multi Category Focus",
      desc: "Diverse data categories to meet various business needs",
      icon: "/HomePageImage/focud.png",
    },
    {
      title: "Data Enhancement",
      desc: "Advanced tools to enrich and optimize your data",
      icon: "/HomePageImage/dataen.png",
    },
  ];

  const stats = [
    {
      "label": "Data Points",
      "value": "7B+",
      "iconPath": "/HomePageImage/datapointss.png"
    },
    {
      "label": "Technologies",
      "value": "115+",
      "iconPath": "/HomePageImage/techh.png"
    },
    {
      "label": "Companies",
      "value": "550K+",
      "iconPath": "/HomePageImage/companies.png"
    },
    {
      "label": "Contracts",
      "value": "80K+",
      "iconPath": "/HomePageImage/contracts.png"
    }
  ]

  const features = [
    "Reduce delivery time with custom templates",
    "Track efforts to impact with OKR planning",
    "Manage complex projects at scale",
    "Always Delivered on Schedule",
    "Delivered with Precision and Punctuality",
    "Every Project Managed with Care",
    "Effort That Shows, Delivery That Counts",
    "Your B2B Tech Partner",
    "Custom Software Solutions",
  ];

  const cards = [
    {
      img: "/abhinay/HomePageImages/1.png",
      title: "Flexible workflows for every team",
    },
    {
      img: "/abhinay/HomePageImages/2.png",
      title: "Task , docs, spreadsheets, and more",
    },
    {
      img: "/abhinay/HomePageImages/3.png",
      title: "Resources and workload optimization",
    },
    {
      img: "/abhinay/HomePageImages/4.png",
      title: "Dashboards and insights",
    },
  ];

  // Helper: extract hex color from API-provided class like "bg-[#F4B400]"
  const getBgColor = (bg) => {
    if (!bg || typeof bg !== "string") return undefined;
    const match = bg.match(/#([0-9A-Fa-f]{3,6})/);
    return match ? match[0] : undefined;
  };

  return (
    <div className="relative">
      <div className="min-h-screen relative">
        <div className="absolute inset-0 w-full h-full -z-10">
          <GlowBackground brightness={0.4} />
        </div>

        <div className="py-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div
              className="bg-cover bg-center"
              style={{

              }}
            >
              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-white/40"></div> */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-0 text-sm text-gray-600">
                  <div className="relative w-20 h-8 flex items-center">
                    {/* First Image */}
                    <div className="absolute left-0  w-6 h-6 top-1/2 -translate-y-1/2 translate-x-10/9 bg-[#6D3E93] rounded-full border-2 border-white z-10 overflow-hidden">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13LZQHT6miu4Vcle98i7GiHmBjqyG7hzU4Q&s"
                        alt="user1"
                      />
                    </div>
                    {/* Second Image */}
                    <div className="absolute left-4  w-6 h-6 top-1/2 -translate-y-1/2 translate-x-10/9 bg-[#6D3E93] rounded-full border-2 border-white z-30 overflow-hidden">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmARA-ImIhkXyRfRZKEUafjk65jDoiFrCxtQ&s"
                        alt="user2"
                      />
                    </div>
                    {/* Third Image */}
                    <div className="absolute left-7  w-6 h-6 top-1/2 -translate-y-1/2 translate-x-10/9  bg-[#6D3E93] rounded-full border-2 border-white z-30 overflow-hidden">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src="data:image/jpeg;base64,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"
                        alt="user3"
                      />
                    </div>
                  </div>
                  {showLovedBy && (
                    <span className="text-[0.72rem]">
                      Loved by Business and Founders
                    </span>
                  )}
                </div>
              </div>

              {/* Main Heading */}
              <h1
                className="font-space font-black w-full mt-2 max-w-4xl mx-auto text-[5.2rem] mb-6 leading-[0.9] text-center"
                style={{ color: "#6D3E93" }}
              >
                Seek{" "}
                <span className="text-[rgba(68,185,180,1)] font-space">
                  Intelligence
                  <br />
                </span>
                <span className="block font-space">Not Information</span>
              </h1>

              {/* Tab Navigation Buttons */}
              <div className="text-center w-full">
                <div className="flex items-center justify-center mb-6">
                  <Usables1 />
                </div>
              </div>
            </div>

            {/* Search Interface */}

            <NewChatbot />
          </div>
        </div>
        {/* <div><p className='text-gray-600 text-center mb-6'>Structure of Business</p></div> */}
        <div className="w-full flex justify-center px-2 sm:px-4 md:px-8 lg:px-2 mt-[30px]">
          <div
            className="w-full max-w-6xl mx-auto flex justify-center bg-white relative mt-16"
            style={{ minHeight: "400px" }}
          >
            <Usables2 />
          </div>
        </div>
        {/* Floating Chatbot */}
        {showChatbot && (
          <FloatingChatbot />
        )}
        <div className="max-w-6xl bg-red-100 mx-auto overflow-x-hidden mt-[6rem]">
          <div className="w-full flex flex-col items-center py-16 px-6 md:px-20 text-center bg-white">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Hit the <span className="text-[#6D3E93]">Ground</span>
              <br />
              <span className="text-[#6D3E93]">Running</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-800 mt-6">
              Intelligence for Every team to Grow and Thrive
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${activeTab === tab
                    ? "border border-gray-800 text-gray-900"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    } ${tab === "Matchmaking"
                      ? "bg-[rgba(158,130,255,0.3)]"
                      : tab === "Research"
                        ? "bg-[rgba(205,153,255,0.3)]"
                        : tab === "Network"
                          ? "bg-[rgba(255,222,153,0.5)]"
                          : tab === "Consulting"
                            ? "bg-[rgba(153,243,255,0.5)]"
                            : ""
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Description */}
            <p className="max-w-4xl text-gray-600 mt-6 leading-relaxed">
              We helps business discover, assess and ingest external data by
              acting as a data marketplace and sourcing platform. We connect
              organizations with access to verified and update data list in
              various format, enabling business to find potential clients,
              partners, or suppliers. We also provide access to vast network of
              data providers...
              <span className="text-[rgba(107,52,255,1)] cursor-pointer">
                Read more
              </span>
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
              {features1.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl">
                    <IKImage
                      path={`${feature.icon}`}
                      alt="not available"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="w-full bg-white overflow-x-hidden">
          <div className="mx-auto max-w-[1300px] px-1 py-13 lg:py-20">
            {/* 2-column responsive layout */}
            <div className="grid items-center gap-7 lg:grid-cols-2">
              {/* Left: Heading + copy + stats */}
              <div>
                <h1 className="text-[3.6rem] font-extrabold leading-[3.6rem] tracking-tight">
                  The Confidence in{" "}
                  <span className="text-[#6D3E93]">Knowing</span>
                </h1>

                <p className="mt-6 text-base leading-7 text-gray-600">
                  LeMiCi is your strategic intelligence partner. Our
                  comprehensive platform aggregates Indian economic, public, and
                  proprietary data, delivering the sharp insights you need to
                  predict market shifts, analyze competitor strategies, and
                  innovate in ways that keep your business unequivocally ahead.
                </p>

                {/* Stats row */}
                <ul className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
                  {stats.map((s, index) => (
                    <li key={index} className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center h-16 mb-2">
                        <IKImage
                          path={s.iconPath}
                          alt={s.label}
                          loading="lazy"
                          className="h-full w-auto object-contain"
                        />
                      </div>

                      <span className="mt-2 text-sm font-inter text-gray-700 whitespace-nowrap">
                        {s.label}
                      </span>

                      <span className="mt-1 text-3xl font-semibold text-gray-900">
                        {s.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Image card */}
              <div className="relative">
                <div className="overflow-hidden mt-[10px] rounded-3xl ring-1 ring-black/5">
                  <IKImage
                    path="/HomePageImage/sec_conf_right_img.png"
                    alt="Abstract purple light waves"
                    className="h-[500px] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full flex justify-center py-12 px-4 mt-20">
          <div className="relative w-[85%] max-w-[1300px] h-[600px] bg-[#F0EAF4] border-2 border-[#EDEDED] rounded-[24px] flex flex-col md:flex-row items-center shadow-lg pt-16 md:pt-0">
            <div className="relative z-20 flex flex-col p-8 md:p-16 lg:p-20 md:w-1/2">
              <div className="flex flex-col items-start relative mb-14 drop-shadow-md -mt-10 md:-mt-32 xl:-mt-40 xl:ml-5">
                <div className="bg-[#6D3E93] text-white pl-16 md:pl-[88px] pr-8 md:pr-12 pt-10 pb-8 md:pb-10 rounded-[40px] md:rounded-[48px] w-full min-w-[320px] md:min-w-[480px]">
                  <h2 className="font-inter font-extrabold text-4xl md:text-[56px] lg:text-[64px] leading-[1.05] tracking-tight">Innovate <br />Smarter, <br />not Harder</h2>
                </div>
                <div className="bg-[#6D3E93] text-white px-10 pt-[10px] md:pt-[4px] pb-10 md:pb-5 rounded-full relative ml-6 md:ml-12 -mt-4 md:-mt-6 w-max">
                  <h2 className="font-inter font-bold text-[30px] md:text-[48px] lg:text-[52px] leading-[1.05] tracking-tight">with AI</h2>
                  <svg className="absolute w-[36px] h-[44px] md:w-[46px] md:h-[54px] -bottom-[43px] md:-bottom-[53px] left-[50px] md:left-[60px]" viewBox="0 0 46 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0V43C0 49 7 51 10 46L46 0H0Z" fill="#6D3E93"></path></svg>
                </div>
              </div>
              <div className="ml-6 md:ml-12">
                <h3 className="font-inter font-bold text-5xl text-[#4433FF] mb-4 tracking-tighter">Raman AI</h3>
                <p className="font-poppins text-base text-[#444444] leading-[150%] max-w-[265px] mb-8">One clear view of your Business brought together in one seamless platform.</p>
                <button onClick={() => alert('Redirecting to Raman AI...')} className="w-[160px] h-[48px] bg-[#652C90] hover:bg-[#4a1d6d] transition-colors rounded-[16px] font-['Poppins'] font-semibold text-base text-white flex items-center justify-center">Learn more</button>
              </div>
            </div>

            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex justify-end items-end overflow-visible pb-12 pr-6 md:pr-10">
              <img alt="Raman AI Robot" className="h-full max-h-[120%] w-auto object-contain object-right-bottom drop-shadow-2xl origin-bottom-right" src="https://ik.imagekit.io/lemiciiq/LeMiCi/HomePageImage/RamanAI.png" />
            </div>
          </div>
        </section>


        <div className="flex flex-col items-center justify-center py-12 bg-white overflow-hidden">
          {/* Custom Animation Style */}
          <style>
            {`
          @keyframes scrollX {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-x {
            animation: scrollX 30s linear infinite;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #6D3E93;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
          </style>

          {/* Logo Replacement */}
          <div className="mt-20 mb-10 flex justify-center">
            <img
              src="https://ik.imagekit.io/lemiciiq/LeMiCi/HomePageImage/lemici_way_logo.png"
              alt="Lemici Way Logo"
              className="h-10 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Animated Scrolling Cards Container */}
          <div className="relative w-full overflow-hidden py-10">
            <div className="flex animate-scroll-x gap-10 w-max">
              {/* Repeat twice for seamless loop */}
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex gap-10 px-5">
                  {/* Card 1 */}
                  <div className="bg-[rgba(234,217,255,0.6)] rounded-[48px] p-12 w-[480px] h-[480px] flex-shrink-0 text-center flex flex-col items-center justify-center border-2 border-[#6D3E93] transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex justify-center mb-8 h-28 items-center">
                      <IKImage
                        path="/HomePageImage/sub.png"
                        alt="One Stop Platform"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <h3 className="text-3xl font-extrabold mb-4 text-gray-900 leading-tight">
                      One Stop Platform
                    </h3>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-[340px]">
                      Unified B2B Intelligence and services, all in one hub.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[rgba(196,242,237,0.6)] rounded-[48px] p-12 w-[480px] h-[480px] flex-shrink-0 text-center flex flex-col items-center justify-center border-2 border-[#14A79D] transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex justify-center mb-8 h-28 items-center">
                      <IKImage
                        path="/HomePageImage/lem_way_FnS.png"
                        alt="Flexible & Scalable"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <h3 className="text-3xl font-extrabold mb-4 text-gray-900 leading-tight">
                      Flexible & Scalable
                    </h3>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-[340px]">
                      Grow with agility, without limits. Adaptable platform,
                      future-ready.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[rgba(255,232,178,0.6)] rounded-[48px] p-12 w-[480px] h-[480px] flex-shrink-0 text-center flex flex-col items-center justify-center border-2 border-[#F4B400] transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex justify-center mb-8 h-28 items-center">
                      <IKImage
                        path="/HomePageImage/gamee.png"
                        alt="Seamless Integration"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <h3 className="text-3xl font-extrabold mb-4 text-gray-900 leading-tight">
                      Seamless Integration
                    </h3>
                    <p className="text-gray-600 text-xl leading-relaxed max-w-[340px]">
                      Effortless data flow, unified insights. Integrate systems,
                      simplify operations.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PilotProgramSection
          showPricing={showPricing}
          pricingInfo={pricingInfo}
        />
        <section className="w-full mt-32 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-6xl leading-20 font-extrabold tracking-tight text-center">
              Get in-depth coverage across <br /> various{" "}
              <span className="text-[#6D3E93]">geographies</span>,{" "}
              <span className="text-[#6D3E93]">industries</span> <br />
              and <span className="text-[#6D3E93]">sectors</span>.
            </h2>

            {/* Subtext */}
            <p className="mt-6 max-w-3xl mx-auto text-center text-gray-600">
              Explore comprehensive data and insights meticulously curated
              across every geography, industry vertical, and market sector
              within India. Understand the nuances to drive precise strategies.
            </p>

            {/* Cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-items-center">
              {cards1.map((col, idx) => (
                <div
                  key={idx}
                  className={`w-full max-w-46 rounded-3xl p-6 flex flex-col justify-center`}
                  style={{ backgroundColor: getBgColor(col.bg) }}
                >
                  {col.items.map((it, i) => (
                    <div
                      key={i}
                      className={`text-center ${i !== 0 ? "mt-8" : ""}`}
                    >
                      <div className="text-white text-3xl font-">
                        {it.number}
                      </div>
                      <div className="mt-1 text-white/90 text-base">
                        {it.label}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Link */}
            <div className="mt-10 text-center">
              <a
                href="#"
                className="inline-block text-indigo-700 hover:text-indigo-800 font-medium"
              >
                View more details of our coverage in India →
              </a>
            </div>
          </div>
        </section>
        <section className="w-full mt-30 px-4 sm:px-6 lg:px-8">
          <div
            className="
          relative overflow-hidden rounded-[28px]
          mx-auto max-w-7xl
          bg-gradient-to-r from-black to-[#6D3E93]
          p-6 sm:p-8 lg:p-12
          min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]
          flex items-center
        "
          >
            <IKImage
              path="/HomePageImage/transform_Section_bg.png"
              alt="Overlay"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* contour/organic pattern overlay */}
            <div
              aria-hidden="true"
              className="
            pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay
            bg-[radial-gradient(120px_120px_at_20%_20%,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0)_60%),radial-gradient(140px_140px_at_70%_35%,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0)_60%),radial-gradient(160px_160px_at_40%_75%,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0)_60%)]
          "
            />

            {/* subtle inner vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_50%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_60%)]"
            />

            {/* Content */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
              <div className="lg:col-span-8">
                <div className="max-w-2xl text-white/90 text-sm sm:text-base leading-6">
                  <p className="mb-2">
                    We transform your organization with innovative strategies
                    and modern solutions.
                  </p>
                  <p className="mb-2">
                    By streamlining processes and embracing digital growth, we
                    help you stay ahead.
                  </p>
                  <p className="mb-2">
                    Our goal is to unlock your full potential and drive
                    meaningful impact.
                  </p>
                  <p>
                    Let’s build a smarter, future-ready organization together.
                  </p>
                </div>

                <h1
                  className="
                mt-6 sm:mt-8 text-white font-extrabold
                text-3xl sm:text-5xl lg:text-[56px] leading-[1.05]
                tracking-tight
              "
                >
                  Transform Your
                  <br className="hidden sm:block" /> Organization With LeMiCi
                </h1>
              </div>

              <div className="lg:col-span-4 lg:flex lg:items-end lg:justify-end">
                <div className="flex lg:justify-end">
                  <a
                    href="#"
                    className="
                  mt-6 lg:mt-0 inline-flex items-center justify-center
                  rounded-2xl bg-white text-gray-900
                  px-6 py-3 text-sm font-semibold shadow-lg
                  hover:shadow-xl hover:bg-white/95 transition
                "
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            {/* rounded corner masks for perfect pill ends on small screens */}
            <span className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/10 to-transparent opacity-10 rounded-l-[28px]" />
            <span className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/10 to-transparent opacity-10 rounded-r-[28px]" />
          </div>
        </section>
      </div>

      {/* Floating bottom-left chat button (hidden while chatbot is open) */}
      {!showChatbot && (
        <DraggableChatButton onClick={() => setShowChatbot(true)} />
      )}

      {/* Floating bottom-right dashboard button */}
      <button
        onClick={() => (window.location.href = "/dashboard")}
        aria-label="Go to Dashboard"
        className="fixed right-4 bottom-6 md:right-6 md:bottom-8 z-[9999] pointer-events-auto bg- rounded-full p-2 hover:shadow-2xl transition transform hover:scale-105"
      >
        <IKImage
          path="/HomePageImage/dashb.jpg"
          alt="Go to Dashboard"
          className="w-12 h-12 rounded-full border-5 border-[#9876b3] p-1 object-cover"
        />
      </button>

      <Footer />
    </div>
  );
};
export default NewHomePage;
