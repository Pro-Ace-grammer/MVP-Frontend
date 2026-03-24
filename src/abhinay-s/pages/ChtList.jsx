import React, { useEffect, useMemo, useState } from "react";
import { IKImage } from "imagekitio-react";
import { MdVerified } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchFranchiseListing } from "../lib/api";
import Hero from "./Hero";
import FeaturedFranchiseCategories from "./FeaturedFranchiseCategories";
import CategoryQuestions from "./CategoryQuestions";
import RecommendedFranchises from "./RecommendedFranchises";
import toast, { Toaster } from "react-hot-toast";


const Fcard = ({
  location = "",
  title = "",
  since = "",
  logoUrl = "https://via.placeholder.com/60",
  description = "",
  rating = 4,
  tags = [],
  stats = { space: "", outlets: "", investment: "" },
  highlights = "",
  verified = false,
  ctaText = "Send Inquiry",
  c = "",
  slug = "",
  onClick,
}) => {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));
  const stars = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  const isAbsoluteLogo =
    typeof logoUrl === "string" &&
    /^(https?:\/\/|\/\/)/.test(logoUrl);
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRatingClick = (e) => {
    e.stopPropagation();
    setShowRating(!showRating);
  };

  const handleSubmitRating = (e) => {
    e.stopPropagation();
    if (selectedRating > 0) {
      toast.success(`Rating submitted: ${selectedRating} stars!`);
      setShowRating(false);
      setSelectedRating(0);
      setFeedback("");
    } else {
      toast.error("Please select a rating first");
    }
  };


  const handleCopyUrl = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/franchise/details/${slug || 'chai-point'}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Listing url copied");
    }).catch(() => {
      toast.error("Failed to copy URL");
    });
  };

  const handleKeyDown = (e) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      className={`w-full max-w-[26rem] rounded-3xl p-4 shadow-sm cursor-pointer`}
      style={{
        background: `linear-gradient(to bottom, ${c}, ${c}0a)`
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 my-4 h-16">
        <IKImage
          path={logoUrl}
          alt={title}
          className="w-14 h-14 rounded-lg object-cover"
          loading="lazy"
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <h2 className="font-semibold text-lg text-white">{title}</h2>
            {verified && <MdVerified className="text-blue-400 text-lg" />}
          </div>

          <p className="text-sm text-white/90">
            {since && `Since ${since}`} {location}
          </p>
        </div>

        {/* Rating */}
        <div className="h-full mt-6 ml-auto flex items-start gap-1 text-sm font-medium">
          <IKImage
            path="FranchiseHomePage/star-rating.png"
            alt="rating"
            className="w-4 h-4"
            loading="lazy"
          />
          <span className="text-gray-700">{rating}</span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-4 text-gray-700 text-sm leading-5 px-3 mb-4 line-clamp-4 h-20">
          {description}
        </p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 mt-4 h-24 overflow-hidden">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-6 py-3 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm inline-flex items-center justify-center"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 text-center mt-8 h-24">
        <div className="flex flex-col items-center gap-1">
          <IKImage
            path="FranchiseHomePage/space.png"
            alt="space"
            className="h-6 w-6"
            loading="lazy"
          />
          <p className="text-xs text-gray-500">Space</p>
          <p className="text-sm font-semibold">{stats.space || "-"}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <IKImage
            path="FranchiseHomePage/riil.png"
            alt="outlets"
            className="h-6 w-6"
            loading="lazy"
          />
          <p className="text-xs text-gray-500">No. of outlets</p>
          <p className="text-sm font-semibold">{stats.outlets || "-"}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <IKImage
            path="FranchiseHomePage/rupee.png"
            alt="investment"
            className="h-6 w-6"
            loading="lazy"
          />
          <p className="text-xs text-gray-500">Investment</p>
          <p className="text-sm font-semibold">{stats.investment || "-"}</p>
        </div>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-6 mb-3 bg-white/70 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center justify-between border border-white/60 shadow-sm">
        <div className="relative flex items-center">
          <button className="cursor-pointer p-2 transition-transform hover:scale-110" onClick={handleRatingClick}>
            <IKImage path="FranchiseHomePage/d1.png" className="w-5 h-5" alt="action" loading="lazy" />
          </button>
          
          {/* Enhanced Review Popup */}
          {showRating && (
            <div 
              className="absolute bottom-full left-0 mb-3 bg-white rounded-2xl shadow-2xl p-5 z-[100] border border-gray-100 w-[300px] sm:w-[330px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-0.5">
                <h3 className="text-base font-bold text-gray-900">Rate this Franchise</h3>
                <button onClick={() => setShowRating(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="text-lg">✕</span>
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mb-4 font-normal">Help others by sharing your experience</p>
              
              <div className="border-t border-gray-100 pt-4 mb-3">
                <p className="text-gray-700 text-xs font-semibold mb-3">How would you rate this opportunity?</p>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className="transition-all hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={star <= (selectedRating || 0) ? "#FFC107" : "none"}
                        stroke={star <= (selectedRating || 0) ? "#FFC107" : "#D1D5DB"}
                        strokeWidth="1.5"
                        className="w-8 h-8"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-xs font-semibold mb-2">Share your feedback (optional)</p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you liked or disliked..."
                  className="w-full min-h-[70px] border border-gray-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition-all placeholder:text-gray-300"
                />
              </div>

              <button
                onClick={handleSubmitRating}
                disabled={!selectedRating}
                className={`w-full py-3 px-3 rounded-2xl font-semibold text-xs transition-all duration-300 ${
                  selectedRating 
                    ? "bg-[#E6E6E6] text-gray-600 hover:bg-[#DEDEDE]" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Rating
              </button>
            </div>
          )}
        </div>
        <button className="cursor-pointer p-2 transition-transform hover:scale-110">
          <IKImage path="FranchiseHomePage/d2.png" className="w-5 h-5" alt="action" loading="lazy" />
        </button>
        <button className="cursor-pointer p-2 transition-transform hover:scale-110" onClick={handleCopyUrl}>
          <IKImage path="FranchiseHomePage/d3.png" className="w-5 h-5" alt="action" loading="lazy" />
        </button>
         <button className="cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center">
           <IKImage path="FranchiseHomePage/icons/send_query.png" className="w-8 h-8" alt="action" loading="lazy" />
         </button>
      </div>
    </div>
  );
}

const FcardGrid = ({
  items = [],
  className = "px-3 sm:px-6 lg:px-12 xl:px-20 py-6 sm:py-8 lg:py-10",
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className={gridClassName}>
        {items.map((item, idx) => (
          <Fcard
            key={idx}
            {...item}
            onClick={() =>
              navigate(
                item.title === "GolfEdge Academy"
                  ? "/newFranchise2"
                  : `/franchise/details/${item.slug || 'chai-point'}`
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

const formatRange = (min, max, unit) => {
  if (!min || !max) return "";
  return `${min}-${max} ${unit}`;
};
const mapFranchiseListingToCard = (items = []) => {

  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    // 🔑 BACKEND → FCARD PROPS MAPPING
    title: item.brand,
    description: item.description,
    location: item.location,
    since: item.year_of_establishment,
    rating: item.rating,
    tags: item.tags || [],
    category: item.category, // ✅ Add category field
    verified: item.tags?.includes("Verified") || true,
    logoUrl: item.logo?.url,
    stats: {
      space: formatRange(
        item.space?.minSpace,
        item.space?.maxSpace,
        item.space?.spaceUnit
      ),
      outlets: item.no_of_outlets,
      investment: formatRange(
        item.investmentRange?.minInvestment,
        item.investmentRange?.maxInvestment,
        item.investmentRange?.investmentUnit
      ),
    },
    c: item.color,
    slug: item.slug,

  }));
};


const CATEGORIES = [
  "Food & Beverage",
  "Retail",
  "Beauty, Personal Care & Grooming",
  "Health & Fitness",
  "Education & EdTech",
  "Automobile Services",
  "Home Services",
  "Business & Professional Services",
  "Real Estate & Property Services",
  "Logistics & Delivery Services",
  "Entertainment & Leisure",
  "Agriculture & Sustainability",
  "Transportation & Mobility",
  "Hospitality & Lodging",
  "Financial Services",
  "Printing, Publishing & Media",
  "Government & Utility Services",
  "Miscellaneous & Specialized Services",
];

export default function ChtList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [heroData, setHeroData] = useState(null);
  const [franchiseItems, setFranchiseItems] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [recommendedFranchises, setRecommendedFranchises] = useState([]);
  const [marketInsights, setMarketInsights] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilterType, setActiveFilterType] = useState("All");

  // Initialize selected categories from URL params on mount
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      const categories = catParam.split(',').filter(Boolean);
      setSelectedCategories(categories);
    }
  }, []); // Only run on mount

  // Update URL when selected categories change
  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      // Update or remove category parameter
      if (selectedCategories.length > 0) {
        newParams.set('category', selectedCategories.join(','));
      } else {
        newParams.delete('category');
      }

      return newParams;
    }, { replace: true });
  }, [selectedCategories, setSearchParams]);


  useEffect(() => {
    // Get industry from URL params
    const industry = searchParams.get('industry');

    fetchFranchiseListing(industry, 1)
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

        const featuredSection = sections.find(
          (s) => s.type === "featured_categories" && s.enabled === true
        );

        if (featuredSection) {
          // console.log("Featured Categories Data:", featuredSection.data);
          setFeaturedCategories(featuredSection.data);
        } else {
          // console.log("Featured categories section not found or disabled");
        }


        const questionSection = sections.find(
          (section) =>
            section.type === "category_questions" &&
            section.enabled === true
        );

        if (questionSection) {
          //   console.log("Category Questions Data:", questionSection.data?.questions);
          setCategoryQuestions(questionSection.data?.questions || []);
        } else {
          //   console.log("Category questions section not found or disabled");
        }

        const recommendedSection = sections.find(
          (section) =>
            section.type === "recommended_franchises" &&
            section.enabled === true
        );

        if (recommendedSection) {
          // console.log("Recommended Franchises Data:", recommendedSection.data?.items);
          setRecommendedFranchises(
            recommendedSection.data?.items || []
          );
        } else {
          // console.log("Recommended franchises section not found or disabled");
        }

        const insightsSection = sections.find(
          (section) =>
            section.type === "key_market_insights" &&
            section.enabled === true
        );

        if (insightsSection) {
          // console.log("Market Insights Data:", insightsSection.data);
          setMarketInsights(insightsSection.data);
        } else {
          // console.log("Market insights section not found or disabled");
        }

      })
      .catch((err) => {
        //   console.error("Error fetching franchise listing:", err);
      });
  }, [searchParams]);





  const [showLocal, setShowLocal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter franchises based on selected categories and search term
  const filteredFranchises = useMemo(() => {
    let filtered = franchiseItems;

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => {
        // Check if any selected category matches the item
        return selectedCategories.some(cat => {
          const categoryLower = cat.toLowerCase();

          // ✅ PRIORITY: Check the main category field first (exact match)
          if (item.category?.toLowerCase() === categoryLower) {
            return true;
          }

          // Also check partial match in category (e.g., "Food" matches "Food & Beverage")
          if (item.category?.toLowerCase().includes(categoryLower) || categoryLower.includes(item.category?.toLowerCase())) {
            return true;
          }

          // Check exact match in tags
          if (item.tags?.some(tag => tag.toLowerCase() === categoryLower)) {
            return true;
          }

          // Check partial match in tags
          if (item.tags?.some(tag => tag.toLowerCase().includes(categoryLower) || categoryLower.includes(tag.toLowerCase()))) {
            return true;
          }

          // Check in title
          if (item.title?.toLowerCase().includes(categoryLower)) {
            return true;
          }

          // Check in description
          if (item.description?.toLowerCase().includes(categoryLower)) {
            return true;
          }

          return false;
        });
      });
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.location?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term) ||
        item.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [franchiseItems, selectedCategories, searchTerm]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setActiveFilterType("All");
  };
  return (
    <>
      <Toaster position="top-center" />
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

              {/* Active Category Filters */}
              {selectedCategories.length > 0 && (
                <>
                  {selectedCategories.slice(0, 2).map((category, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 whitespace-nowrap"
                    >
                      <span className="max-w-[100px] truncate">{category}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category);
                        }}
                        className="hover:text-blue-900"
                        aria-label="Remove filter"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {selectedCategories.length > 2 && (
                    <span className="text-blue-700 text-xs font-medium">+{selectedCategories.length - 2}</span>
                  )}
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
            <button
              onClick={() => setShowFilterModal(true)}
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

            {/* Clear All Filters */}
            {(selectedCategories.length > 0 || searchTerm) && (
              <button
                onClick={clearAllFilters}
                className="text-white text-sm underline hover:text-gray-200 transition"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category tags */}
          <div className="flex gap-2 mt-2 text-[11px] sm:text-xs flex-wrap">
            <button
              onClick={() => setActiveFilterType("All")}
              className={`px-3 py-1 rounded-lg transition ${activeFilterType === "All" ? "bg-white text-black" : "hover:bg-white hover:text-black"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilterType("Industry")}
              className={`px-3 py-1 rounded-lg transition ${activeFilterType === "Industry" ? "bg-white text-black" : "hover:bg-white hover:text-black"
                }`}
            >
              Industry
            </button>
            <button
              onClick={() => setActiveFilterType("Sector")}
              className={`px-3 py-1 rounded-lg transition ${activeFilterType === "Sector" ? "bg-white text-black" : "hover:bg-white hover:text-black"
                }`}
            >
              Sector
            </button>
            <button
              onClick={() => setActiveFilterType("Investment")}
              className={`px-3 py-1 rounded-lg transition ${activeFilterType === "Investment" ? "bg-white text-black" : "hover:bg-white hover:text-black"
                }`}
            >
              Investment
            </button>
            <button
              onClick={() => setActiveFilterType("City")}
              className={`px-3 py-1 rounded-lg transition ${activeFilterType === "City" ? "bg-white text-black" : "hover:bg-white hover:text-black"
                }`}
            >
              City
            </button>
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

      {/* Category Filter Modal */}
      {showFilterModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFilterModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Filter by Category</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Selected: <span className="font-semibold">{selectedCategories.length}</span> categories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition ${isSelected
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      {isSelected && <span className="text-lg">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedCategories([])}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="px-3 sm:px-6 lg:px-12 xl:px-20 py-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">
            {selectedCategories.length > 0 && (
              <span className="text-blue-600 ml-2">({selectedCategories.length} filter{selectedCategories.length > 1 ? 's' : ''} active)</span>
            )}
          </p>
        </div>
      </div>

      {filteredFranchises.length > 0 ? (
        <FcardGrid items={filteredFranchises} />
      ) : (
        <div className="px-3 sm:px-6 lg:px-12 xl:px-20 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No franchises found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategories.length > 0 || searchTerm
                ? "Try adjusting your filters or search term"
                : "No franchises available at the moment"}
            </p>
            {(selectedCategories.length > 0 || searchTerm) && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}


      <div className="max-w-[87rem] mx-auto">
        <div className="w-full px-6 py-10 bg-white">
          <div className="flex gap-6">
            {/* Left side - Franchise grid */}
            {featuredCategories.length > 0 && <FeaturedFranchiseCategories
              title="Featured all franchise categories"
              data={featuredCategories}   // backend mapped data
              showViewMore={true}
            />}



            {/* Right side - Insights */}
            {categoryQuestions.length > 0 && (
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
              {recommendedFranchises.length > 0 && <RecommendedFranchises data={recommendedFranchises} />}
            </div>

            {/* Right side: Market insights */}
            {marketInsights && (
              <div className="w-[350px] border border-[#EDEDED] rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3">Key Market insights</h3>
                <div className="space-y-3">
                  {marketInsights.market_trend && (
                    <div>
                      <p className="text-[#268BFF] font-medium">{marketInsights.market_trend.title}</p>
                      <p className="text-gray-600 text-sm mt-1">
                        {marketInsights.market_trend.description}
                      </p>
                    </div>
                  )}
                  {marketInsights.growth_rate && (
                    <div>
                      <p className="text-[#268BFF] font-medium">{marketInsights.growth_rate.title}</p>
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
