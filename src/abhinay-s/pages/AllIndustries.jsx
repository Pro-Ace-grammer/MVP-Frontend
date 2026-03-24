import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { fetchIndustries } from "@/abhinay-s/lib/api";
import { useNavigate } from "react-router-dom";

export default function AllIndustries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchIndustries();
        if (res.success && res.data) {
          setIndustries(res.data);
          if (res.data.length > 0) {
            setSelectedIndustry(res.data[0]);
          }
        } else {
          setError("Failed to load industry data.");
        }
      } catch (err) {
        console.error("Error loading industries:", err);
        setError("An error occurred while fetching industries.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredIndustries = industries.filter((ind) => {
    return ind.categories.some((cat) => {
      const matchesCat = cat.category_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSub = cat.sub_categories?.some((sub) =>
        sub.sub_category_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesCat || matchesSub;
    });
  });

  useEffect(() => {
    if (filteredIndustries.length > 0) {
      const isStillVisible = filteredIndustries.some(
        (ind) => ind.industry_name === selectedIndustry?.industry_name
      );
      if (!isStillVisible) {
        setSelectedIndustry(filteredIndustries[0]);
      }
    } else {
      setSelectedIndustry(null);
    }
  }, [searchTerm, industries]);

  const filteredCategories = selectedIndustry
    ? selectedIndustry.categories
      .filter((cat) => {
        const matchesCat = cat.category_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesSub = cat.sub_categories?.some((sub) =>
          sub.sub_category_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesCat || matchesSub;
      })
      .sort((a, b) => {
        const aHas = a.sub_categories && a.sub_categories.length > 0;
        const bHas = b.sub_categories && b.sub_categories.length > 0;
        if (aHas === bHas) return 0;
        return aHas ? -1 : 1;
      })
    : [];

  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-gray-500 font-medium font-['Space_Grotesk']">Loading industries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-200 max-w-md">
          <div className="text-red-500 mb-4 inline-block p-3 bg-red-50 rounded-full">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full bg-[#FAFAFA] py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
          Browse All <br />
          Franchise Industries
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header with Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 font-['Space_Grotesk']">
            All Franchise Industries
          </h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Industry"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
            />
          </div>
        </div>

        {/* Industry Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filteredIndustries.map((ind, idx) => {
            const isActive = selectedIndustry?.industry_name === ind.industry_name;
            return (
              <button
                key={idx}
                onClick={() => handleIndustryClick(ind)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 border
                  ${isActive
                    ? "bg-gray-100 border-gray-200 text-gray-900 shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                {ind.industry_name}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-[#3B82F6] font-bold text-lg leading-tight hover:underline cursor-pointer transition">
                {cat.category_name}
              </h3>
              <div className="flex flex-col gap-2">
                {cat.sub_categories.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className="text-gray-600 text-sm hover:text-indigo-600 cursor-pointer transition w-fit"
                  >
                    {sub.sub_category_name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
