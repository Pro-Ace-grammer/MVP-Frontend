import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchFranchise } from "@/abhinay-s/lib/api";
import { mapFranchiseListingToCard } from "./Fcard";
import FranchiseLayout from "@/abhinay-s/abhinay/components/navbar/OfferingComponents/Franchise/FranchiseLayout";

export default function NewFranchiseListingsrchAll() {
  const { query } = useParams();
  const [heroData, setHeroData] = useState(null);
  const [franchiseListing, setFranchiseListing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await searchFranchise(query);
        // searchFranchise returns response.data (the body)
        // Body structure: { success: true, data: { sections: [...] } } OR top-level array
        const dataPayload = res?.data || res;
        const rawSections = Array.isArray(dataPayload) ? dataPayload : dataPayload?.sections || [];
        
        const heroSection = rawSections.find((s) => s.type === "hero");
        if (heroSection) setHeroData(heroSection.data);

        // Find ANY section that has an array (either as data or data.items)
        const listingSection = rawSections.find((s) => 
          (Array.isArray(s.data) || Array.isArray(s.data?.items)) && s.type !== 'hero'
        );
        
        let searchData = null;
        if (listingSection) {
          searchData = listingSection.data;
        } else if (Array.isArray(dataPayload)) {
          searchData = dataPayload;
        }

        if (searchData) {
          setFranchiseListing(mapFranchiseListingToCard(searchData));
        }
      } catch (err) {
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <FranchiseLayout
      heroData={heroData}
      franchiseListing={franchiseListing}
      title={`Search Results for: ${query}`}
      showDescription={false}
      loading={loading}
    />
  );
}