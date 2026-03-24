import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Hero from "@/abhinay-s/pages/Hero";
import FeaturedFranchiseCategories from "@/abhinay-s/pages/FeaturedFranchiseCategories";
import CategoryQuestions from "@/abhinay-s/pages/CategoryQuestions";
import RecommendedFranchises from "@/abhinay-s/pages/RecommendedFranchises";
import { FcardGrid } from "./Fcard";
import FloatingChatbot from "@/abhinay-s/abhinay/FloatingChatbot";
import { useChatbot } from "@/abhinay-s/abhinay/ChatbotContext";

const FranchiseLayout = ({
  heroData,
  franchiseListing = [],
  featuredCategories = [],
  categoryQuestions = [],
  recommendedFranchises = [],
  marketInsights = null,
  title = "Franchise Opportunities",
  loading = false,
  showResultsCount = false,
  showDescription = true,
  searchTerm = "",
  onSearchChange = () => { },
  onAddFilterClick = () => { },
  showLocal = false,
  onShowLocalChange = () => { },
  selectedCategories = [],
  onClearFilters = () => { },
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { showChatbot } = useChatbot();

  return (
    <>
      <Toaster position="top-center" />
      <section className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] flex items-center text-white bg-[#4A53FA] -mt-[116px]">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-16 flex flex-col gap-4 mt-28">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {title}
          </h2>

          {/* Explanation/Description */}
          {heroData && showDescription && <Hero data={heroData} />}

          {/* Search & Filters - HIDDEN TEMPORARILY AS PER USER REQUEST */}
          {/* <div className="flex items-center gap-3 mt-1 sm:mt-2 flex-wrap">
            <div className="flex items-center bg-white rounded-sm px-2 sm:px-3 py-1.5 sm:py-2 w-full sm:w-96">
              <img
                src="/abhinay/franchise/random1a.png"
                className="w-4 h-4"
                alt=""
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Industry, Sector, Brand name"
                aria-label="Search franchises by industry, sector or brand name"
                className="flex-1 outline-none text-black text-sm px-2 bg-transparent"
              />

              {selectedCategories.length > 0 && (
                <div className="hidden sm:flex items-center gap-1">
                   <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                      <span>{selectedCategories.length} Filters</span>
                   </div>
                </div>
              )}

              {searchTerm && (
                <button
                  onClick={() => onSearchChange("")}
                  className="text-gray-500 hover:text-red-500 px-2"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <button 
              onClick={onAddFilterClick}
              className="bg-white flex gap-2 items-center text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition"
            >
              <img
                src="/abhinay/franchise/random1b.png"
                className="w-3 h-3"
                alt=""
              />
              <span className="text-[#4A53FA]">
                {selectedCategories.length > 0 ? `Filters (${selectedCategories.length})` : 'Add Filter'}
              </span>
            </button>

            {(selectedCategories.length > 0 || searchTerm) && (
              <button 
                onClick={onClearFilters}
                className="text-white text-sm underline hover:text-gray-200 transition"
              >
                Clear All
              </button>
            )}
          </div> */}

          {/* Category tags - HIDDEN TEMPORARILY */}
          {/* <div className="flex gap-2 mt-2 text-[11px] sm:text-xs flex-wrap">
            {["All", "Industry", "Sector", "Investment", "City"].map((tag) => (
              <button 
                key={tag}
                className="px-3 py-1 hover:bg-white hover:text-black rounded-lg transition"
              >
                {tag}
              </button>
            ))}
          </div> */}
        </div>

        {/* Toggle Switch - HIDDEN TEMPORARILY */}
        {/* <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 text-xs sm:text-white/80">
          <span className="hidden sm:inline">Show Local Franchises</span>
          <label
            className="relative inline-flex items-center cursor-pointer"
            aria-label="Toggle local franchises"
          >
            <input
              type="checkbox"
              checked={showLocal}
              onChange={onShowLocalChange}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-white/20 peer-checked:bg-white/40 rounded-full after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div> */}
      </section>

      {/* Breadcrumbs or other spacing if needed */}
      <div className="h-8"></div>

      {loading ? (
        <div className="px-3 sm:px-6 lg:px-12 xl:px-20 py-20 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin"
              style={{
                borderColor: "#e5e7eb",
                borderTopColor: "#6D3E93",
              }}
            ></div>
            <p className="mt-4 text-gray-600">Loading franchises...</p>
          </div>
        </div>
      ) : franchiseListing.length > 0 ? (
        <>
          <FcardGrid items={isExpanded ? franchiseListing : franchiseListing.slice(0, 6)} />

          {franchiseListing.length > 6 && !isExpanded && (
            <div className="flex justify-center mt-12 mb-16">
              <button
                onClick={() => setIsExpanded(true)}
                className="text-[#268BFF] text-2xl font-medium flex items-center gap-2 hover:gap-4 transition-all duration-300"
              >
                View All <span className="text-3xl">→</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="px-3 sm:px-6 lg:px-12 xl:px-20 py-20 text-center text-gray-500">
          No franchises found.
        </div>
      )}

      <div className="max-w-[87rem] mx-auto">
        <div className="w-full px-6 py-16 bg-white border-t border-gray-50">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left side - Franchise grid */}
            <div className="flex-1">
              {featuredCategories.length > 0 && (
                <FeaturedFranchiseCategories
                  title={searchTerm ? `Featured ${searchTerm.toLowerCase()} categories` : "Featured franchise categories"}
                  data={featuredCategories}
                  showViewMore={true}
                />
              )}
            </div>

            {/* Right side - Insights */}
            {categoryQuestions.length > 0 && (
              <div className="lg:w-[460px] sticky top-24">
                <CategoryQuestions data={categoryQuestions} />
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-6 py-10 bg-white border-t border-gray-100">
          {/* Recommended Franchise Section */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommended Food Franchises</h2>
                <p className="text-gray-500 max-w-2xl text-sm sm:text-base">
                  Discover top-rated franchises handpicked based on your preferences and
                  investment range. Explore high-potential food businesses that are expanding fast.
                </p>
              </div>
              <button className="text-[#4A53FA] text-sm font-bold hover:underline flex items-center gap-1.5 shrink-0 mb-1">
                View more <span className="text-lg">→</span>
              </button>
            </div>
            <RecommendedFranchises />
          </div>

          {/* Key Market Insights Section (Static Redesign) */}
          <div className="border border-gray-100 rounded-[40px] p-8 md:p-14 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
            {/* Left Column: Detailed Insights */}
            <div className="flex-1 space-y-12">
              <h3 className="text-2xl font-extrabold text-gray-900">Key Market insights</h3>
              
              <div className="space-y-10">
                {/* Market Trend */}
                <div className="flex gap-6">
                  <div className="w-1.5 bg-[#4A53FA] rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-[#4A53FA] font-bold text-sm uppercase tracking-widest mb-2">Market Trend</h4>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Golf is evolving from an elite outdoor sport to an accessible indoor entertainment 
                      and training experience through simulators and golf lounges
                    </p>
                  </div>
                </div>

                {/* Growth Rate */}
                <div className="flex gap-6">
                  <div className="w-1.5 bg-[#4A53FA] rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-[#4A53FA] font-bold text-sm uppercase tracking-widest mb-2">Growth Rate</h4>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      The indoor golf simulator market in India is growing at a CAGR of 17-20%, 
                      driven by rising disposable income in premium experiences, and tech adoption
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Divider (Hidden on mobile) */}
            <div className="hidden lg:block w-px bg-gray-100 self-stretch my-2"></div>

            {/* Right Column: Stats Panel */}
            <div className="lg:w-80 flex flex-col justify-center gap-14 text-center lg:text-left lg:pl-10">
              <div className="group">
                <p className="text-[#4A53FA] text-6xl font-black mb-2 transition-transform group-hover:scale-105 duration-300">500+</p>
                <p className="text-gray-500 font-bold text-lg">Active Franchises</p>
              </div>
              <div className="group">
                <p className="text-[#00C07F] text-6xl font-black mb-2 transition-transform group-hover:scale-105 duration-300">17%</p>
                <p className="text-gray-500 font-bold text-lg">Avg. Growth</p>
              </div>
            </div>
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

      {/* Direct AI Chatbot Activation (Hidden cube on this page) */}
      {showChatbot && <FloatingChatbot />}
    </>
  );
}

export default FranchiseLayout;
