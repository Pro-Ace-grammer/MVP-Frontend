import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { fetchFranchiseListing, searchFranchise } from "@/abhinay-s/lib/api";
import { mapFranchiseListingToCard } from "@/abhinay-s/abhinay/components/navbar/OfferingComponents/Franchise/Fcard";
import FranchiseLayout from "@/abhinay-s/abhinay/components/navbar/OfferingComponents/Franchise/FranchiseLayout";

const CATEGORIES = [
  "Food & Beverage", "Retail", "Beauty, Personal Care & Grooming",
  "Health & Fitness", "Education & EdTech", "Automobile Services",
  "Home Services", "Business & Professional Services", "Real Estate & Property Services",
  "Logistics & Delivery Services", "Entertainment & Leisure", "Agriculture & Sustainability",
  "Transportation & Mobility", "Hospitality & Lodging", "Financial Services",
  "Printing, Publishing & Media", "Government & Utility Services", "Miscellaneous & Specialized Services",
];

export default function NewFranchiseListingAll() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  
  const [heroData, setHeroData] = useState(null);
  const [franchiseItems, setFranchiseItems] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [recommendedFranchises, setRecommendedFranchises] = useState([]);
  const [marketInsights, setMarketInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showLocal, setShowLocal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const industry = searchParams.get("industry");
    setLoading(true);

    const fetchData = async () => {
      try {
        let res;
        if (query) {
          res = await searchFranchise(query);
          setSearchTerm(query);
        } else {
          res = await fetchFranchiseListing(industry, 1);
        }

        if (!res?.success && !Array.isArray(res?.data)) {
           // If search returns just an array or different structure
           const dataPayload = res?.data || res;
           if (Array.isArray(dataPayload)) {
              setFranchiseItems(mapFranchiseListingToCard(dataPayload));
              setLoading(false);
              return;
           }
        }

        const dataPayload = res.data || {};
        const sections = dataPayload.sections || [];

        // Handle direct array response for search
        if (Array.isArray(dataPayload) && sections.length === 0) {
            setFranchiseItems(mapFranchiseListingToCard(dataPayload));
        }

        const heroSection = sections.find((s) => s.type === "hero" && s.enabled !== false);
        if (heroSection) setHeroData(heroSection.data);

        const listingSection = sections.find(
          (s) => (s.type === "franchise_listing" || s.type === "recommended_franchises" || s.type === "search_results" || s.type === "franchise_grid") && s.enabled !== false
        );

        if (listingSection) {
          setFranchiseItems(mapFranchiseListingToCard(listingSection.data || listingSection.data?.items));
        } else if (sections.length > 0) {
            // Fallback: find any section that looks like a listing
            const anyListing = sections.find(s => Array.isArray(s.data) || Array.isArray(s.data?.items));
            if (anyListing) setFranchiseItems(mapFranchiseListingToCard(anyListing.data || anyListing.data?.items));
        }

        const featuredSection = sections.find((s) => s.type === "featured_categories" && s.enabled === true);
        if (featuredSection) setFeaturedCategories(featuredSection.data);

        const questionSection = sections.find((s) => s.type === "category_questions" && s.enabled === true);
        if (questionSection) setCategoryQuestions(questionSection.data?.questions || []);

        const recommendedSection = sections.find((s) => s.type === "recommended_franchises" && s.enabled === true);
        if (recommendedSection) setRecommendedFranchises(recommendedSection.data?.items || []);

        const insightsSection = sections.find((s) => s.type === "key_market_insights" && s.enabled === true);
        if (insightsSection) setMarketInsights(insightsSection.data);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, query]);

  const filteredFranchises = useMemo(() => {
    let filtered = franchiseItems;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.some((cat) => {
          const lowerCat = cat.toLowerCase();
          return (
            item.category?.toLowerCase().includes(lowerCat) ||
            item.tags?.some((t) => t.toLowerCase().includes(lowerCat)) ||
            item.title?.toLowerCase().includes(lowerCat)
          );
        })
      );
    }

    if (searchTerm.trim() && !query) { // Local filter only if not a route-based search
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term) ||
          item.tags?.some((t) => t.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [franchiseItems, selectedCategories, searchTerm, query]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <>
      <FranchiseLayout
        heroData={heroData}
        franchiseListing={filteredFranchises}
        featuredCategories={featuredCategories}
        categoryQuestions={categoryQuestions}
        recommendedFranchises={recommendedFranchises}
        marketInsights={marketInsights}
        title={query ? `Search Results for: ${query}` : (heroData?.description || "Explore All Franchise Opportunities")}
        showDescription={false}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddFilterClick={() => setShowFilterModal(true)}
        selectedCategories={selectedCategories}
        onClearFilters={() => {
            setSearchTerm("");
            setSelectedCategories([]);
        }}
        showLocal={showLocal}
        onShowLocalChange={() => setShowLocal(!showLocal)}
      />

      {/* Category Filter Modal */}
      {showFilterModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowFilterModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Filter by Category</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition ${isSelected ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      {isSelected && <span>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSelectedCategories([])} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Clear All</button>
              <button onClick={() => setShowFilterModal(false)} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
