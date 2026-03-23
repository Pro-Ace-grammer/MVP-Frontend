import React, { useEffect, useState } from "react";
import { IKImage } from "imagekitio-react";
import { MdVerified } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { fetchFranchiseListing } from "../lib/api";
import Hero from "./Hero";
import FeaturedFranchiseCategories from "./FeaturedFranchiseCategories";
import CategoryQuestions from "./CategoryQuestions";
import RecommendedFranchises from "./RecommendedFranchises";
import toast, { Toaster } from "react-hot-toast";


import Fcard, { FcardGrid, mapFranchiseListingToCard } from "../abhinay/components/navbar/OfferingComponents/Franchise/Fcard";


const fCat = { category: "food" };

export default function NewFranchiseListing() {
const [direction, setDirection] = React.useState("");

    const [heroData, setHeroData] = useState(null);
const [franchiseItems, setFranchiseItems] = useState([]);
const [featuredCategories, setFeaturedCategories] = useState([]);
const [categoryQuestions, setCategoryQuestions] = useState([]);
const [recommendedFranchises, setRecommendedFranchises] = useState([]);
const [activeFilters, setActiveFilters] = useState([fCat]);
useEffect(() => {
  fetchFranchiseListing()
    .then((res) => {
      if (!res?.success) return;

      const sections = res.data?.sections || [];

      // HERO SECTION ✅
      const heroSection = sections.find(
        (section) =>
          section.type === "hero" && section.enabled === true
      );

      if (heroSection) {
        setHeroData(heroSection.data);
      }

      // FRANCHISE LISTING SECTION ✅
      const listingSection = sections.find(
        (section) =>
          section.type === "franchise_listing" &&
          section.enabled === true
      );

      if (listingSection) {
        const mappedData = mapFranchiseListingToCard(
          listingSection.data
        );
        setFranchiseItems(mappedData);
      }
    //   console.log(listingSection.data)

       const featuredSection = sections.find(
        (s) => s.type === "featured_categories" && s.enabled === true
      );

      if (featuredSection) {
        setFeaturedCategories(featuredSection.data);
      }


       const questionSection = sections.find(
      (section) =>
        section.type === "category_questions" &&
        section.enabled === true
    );

    if (questionSection) {
      setCategoryQuestions(questionSection.data?.questions || []);
    }

      const recommendedSection = sections.find(
        (section) =>
          section.type === "recommended_franchises" &&
          section.enabled === true
      );

      if (recommendedSection) {
        setRecommendedFranchises(
          recommendedSection.data?.items || []
        );
      }


    })
    .catch((err) => {
      console.error("Error fetching franchise listing:", err);
    });
}, []);

  
 
    
  
const [showLocal, setShowLocal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Toaster position="top-right" />
     <section className="relative w-full h-72 sm:h-80 lg:h-[380px] flex items-center text-white bg-[#4A53FA] -mt-24">

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-16 flex flex-col gap-4 mt-22">
          {/* Heading + description */}
           {heroData && <Hero data={heroData} />}

          {/* Search & Filters */}
          <div className="flex items-center gap-3 mt-1 sm:mt-2 flex-wrap">
            {/* Search bar */}
            <div className="flex items-center bg-white rounded-sm px-2 sm:px-3 py-1.5 sm:py-2 w-full sm:w-96">
              <img
                src="/abhinay/franchise/random1a.png"
                className="w-4 h-4"
                alt=""
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Industry, Sector, Brand name"
                aria-label="Search franchises by industry, sector or brand name"
                className="flex-1 outline-none text-black text-sm px-2 bg-transparent"
              />

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <>
                  {activeFilters.map((filter, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      <span>{filter.category}</span>
                      <button
                        onClick={() => setActiveFilters(activeFilters.filter((_, i) => i !== idx))}
                        className="hover:text-blue-900"
                        aria-label="Remove filter"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </>
              )}

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-gray-500 hover:text-red-500 px-2"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Add Filter button */}
            <button className="bg-white flex gap-2 items-center text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
              <img
                src="/abhinay/franchise/random1b.png"
                className="w-3 h-3"
                alt=""
              />
              <span className="text-[#4A53FA]">Add Filter</span>
            </button>
          </div>

          {/* Category tags */}
          <div className="flex gap-2 mt-2 text-[11px] sm:text-xs flex-wrap">
            <span className="px-3 py-1 hover:bg-white hover:text-black rounded-lg">
              All
            </span>
            <span className="px-3 py-1 hover:bg-white hover:text-black rounded-lg">
              Industry
            </span>
            <span className="px-3 py-1 hover:bg-white hover:text-black rounded-lg">
              Sector
            </span>
            <span className="px-3 py-1 hover:bg-white hover:text-black rounded-lg">
              Investment
            </span>
            <span className="px-3 py-1 hover:bg-white hover:text-black rounded-lg">
              City
            </span>
          </div>
        </div>

        {/* Toggle Switch - Right Corner */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 text-xs sm:text-sm">
          <span className="hidden sm:inline">Show Local Franchises</span>
          <label
            className="relative inline-flex items-center cursor-pointer"
            aria-label="Toggle local franchises"
          >
            <input
              type="checkbox"
              checked={showLocal}
              onChange={() => setShowLocal((v) => !v)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-400 peer-checked:bg-blue-500 rounded-full after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>
      </section>

      {franchiseItems && (
  <FcardGrid items={franchiseItems} />
)}

      <div className="max-w-[87rem] mx-auto">
        <div className="w-full px-6 py-10 bg-white">
          <div className="flex gap-6">
            {/* Left side - Franchise grid */}
            {featuredCategories && <FeaturedFranchiseCategories
  title={`Featured ${fCat.category} franchise categories`}
  data={featuredCategories}   // backend mapped data
  showViewMore={true}
/>}
            


            {/* Right side - Insights */}
            {categoryQuestions && (
  <CategoryQuestions data={categoryQuestions} />
)}

          </div>
        </div>

        <div className="w-full px-6 py-10 bg-white">
          <div className="flex gap-6">
            {/* Left side: Franchise cards */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-1">Recommended Franchise</h2>
              <p className="mb-6 text-gray-600 max-w-2xl">
                Discover top-rated franchises handpicked based on your preferences
                and investment range.
                Explore high-potential food businesses that are expanding fast.
              </p>
              {recommendedFranchises && <RecommendedFranchises data={recommendedFranchises} />}
            </div>

            {/* Right side: Market insights */}
            <div className="w-[350px] border border-[#EDEDED] rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3">Key Market insights</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[#268BFF] font-medium">Market Trend</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Golf is evolving from an elite outdoor sport to an
                    accessible indoor entertainment and training experience
                    through simulators and golf lounges.
                  </p>
                </div>
                <div>
                  <p className="text-[#268BFF] font-medium">Growth Rate</p>
                  <p className="text-gray-600 text-sm mt-1">
                    The indoor golf simulator market in India is growing at a
                    CAGR of 17–20%, driven by rising disposable income in
                    premium experiences, and tech adoption.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-xs text-gray-500 leading-relaxed">
            <strong>Disclaimer:</strong> LeMiCi IQ is an integrated franchise
            solution company since 2025 and an absolute authority on franchising
            and licensing. FIHL (www.lemici.com) and the site sponsors accept no
            liability for the accuracy of any information contained on this site
            or other linked sites. We recommend you take advice from a lawyer,
            accountant, and franchise consultant experienced in franchising
            before you commit yourself. It is the user's responsibility to
            verify accuracy and reliability. Please read the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              terms & condition
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
