import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { fetchFranchiseListing } from "@/abhinay-s/lib/api";
import { mapFranchiseListingToCard } from "@/abhinay-s/abhinay/components/navbar/OfferingComponents/Franchise/Fcard";
import FranchiseLayout from "@/abhinay-s/abhinay/components/navbar/OfferingComponents/Franchise/FranchiseLayout";

export default function NewFranchiseListingAll() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [heroData, setHeroData] = useState(null);
  const [franchiseItems, setFranchiseItems] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [recommendedFranchises, setRecommendedFranchises] = useState([]);
  const [marketInsights, setMarketInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const industry = searchParams.get("industry");
    setLoading(true);

    fetchFranchiseListing(industry, 1)
      .then((res) => {
        setLoading(false);
        if (!res?.success) return;
        const sections = res.data?.sections || [];

        const heroSection = sections.find(
          (s) => s.type === "hero" && s.enabled !== false
        );
        if (heroSection) setHeroData(heroSection.data);

        const listingSection = sections.find(
          (s) => (s.type === "franchise_listing" || s.type === "recommended_franchises" || s.type === "search_results" || s.type === "franchise_grid") && s.enabled !== false
        );

        if (listingSection) {
          const mappedData = mapFranchiseListingToCard(listingSection.data);
          setFranchiseItems(mappedData);
        }

        const featuredSection = sections.find(
          (s) => s.type === "featured_categories" && s.enabled === true
        );
        if (featuredSection) setFeaturedCategories(featuredSection.data);

        const questionSection = sections.find(
          (s) => s.type === "category_questions" && s.enabled === true
        );
        if (questionSection) setCategoryQuestions(questionSection.data?.questions || []);

        const recommendedSection = sections.find(
          (s) => s.type === "recommended_franchises" && s.enabled === true
        );
        if (recommendedSection) setRecommendedFranchises(recommendedSection.data?.items || []);

        const insightsSection = sections.find(
          (s) => s.type === "key_market_insights" && s.enabled === true
        );
        if (insightsSection) setMarketInsights(insightsSection.data);
      })
      .catch(() => setLoading(false));
  }, [searchParams]);

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

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term) ||
          item.tags?.some((t) => t.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [franchiseItems, selectedCategories, searchTerm]);

  return (
    <FranchiseLayout
      heroData={heroData}
      franchiseListing={filteredFranchises}
      featuredCategories={featuredCategories}
      categoryQuestions={categoryQuestions}
      recommendedFranchises={recommendedFranchises}
      marketInsights={marketInsights}
      title={heroData?.description || "Explore All Franchise Opportunities"}
      showDescription={false}
      loading={loading}
    />
  );
}
