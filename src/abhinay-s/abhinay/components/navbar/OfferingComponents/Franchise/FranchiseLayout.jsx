import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Hero from "@/abhinay-s/pages/Hero";
import FeaturedFranchiseCategories from "@/abhinay-s/pages/FeaturedFranchiseCategories";
import CategoryQuestions from "@/abhinay-s/pages/CategoryQuestions";
import RecommendedFranchises from "@/abhinay-s/pages/RecommendedFranchises";
import { FcardGrid } from "./Fcard";

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
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log("FranchiseLayout Props:", { 
    title, 
    itemsCount: franchiseListing.length, 
    loading,
    featuredCount: featuredCategories.length,
    questionsCount: categoryQuestions.length
  });

  return (
    <>
      <Toaster position="top-right" />
      <section className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px] flex items-center text-white bg-[#4A53FA] -mt-[116px]">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-16 flex flex-col gap-2 mt-28">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {title}
          </h2>
          
          {/* Explanation/Description */}
          {heroData && showDescription && <Hero data={heroData} />}
        </div>
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
        <div className="w-full px-6 py-10 bg-white">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Franchise grid */}
            <div className="flex-1">
              {featuredCategories.length > 0 && (
                <FeaturedFranchiseCategories
                  title="Featured franchise categories"
                  data={featuredCategories}
                  showViewMore={true}
                />
              )}
            </div>

            {/* Right side - Insights */}
            {categoryQuestions.length > 0 && (
              <div className="lg:w-[350px]">
                 <CategoryQuestions data={categoryQuestions} />
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-6 py-10 bg-white border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side: Recommended cards */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-1">Recommended Franchise</h2>
              <p className="mb-6 text-gray-600 max-w-2xl text-sm sm:text-base">
                Discover top-rated franchises handpicked based on your preferences and
                investment range. Explore high-potential businesses that are expanding fast.
              </p>
              {recommendedFranchises.length > 0 && (
                <RecommendedFranchises data={recommendedFranchises} />
              )}
            </div>

            {/* Right side: Market insights */}
            {marketInsights && (
              <div className="lg:w-[350px] border border-[#EDEDED] rounded-xl p-6 bg-gray-50/50">
                <h3 className="text-lg font-bold mb-3">Key Market insights</h3>
                <div className="space-y-4">
                  {marketInsights.market_trend && (
                    <div>
                      <p className="text-[#268BFF] font-medium">
                        {marketInsights.market_trend.title}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {marketInsights.market_trend.description}
                      </p>
                    </div>
                  )}
                  {marketInsights.growth_rate && (
                    <div>
                      <p className="text-[#268BFF] font-medium">
                        {marketInsights.growth_rate.title}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {marketInsights.growth_rate.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
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
    </>
  );
};

export default FranchiseLayout;
