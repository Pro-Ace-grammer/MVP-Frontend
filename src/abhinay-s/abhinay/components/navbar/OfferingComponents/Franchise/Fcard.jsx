import { MdVerified } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import toast from "react-hot-toast";
import { useState } from "react";

// Single franchise card component - accepts dynamic data via props
export default function Fcard({
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
  onClick,
  animationClass = "",
  animationDelay = "0s",
}) {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));
  const stars = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  const isAbsoluteLogo =
  typeof logoUrl === "string" &&
  /^(https?:\/\/|\/\/)/.test(logoUrl);

  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const ratingEmojis = [
    
    { emoji: "😞", label: "Very Bad", value: 1 },
    { emoji: "😕", label: "Bad", value: 2 },
    { emoji: "😐", label: "Good", value: 3 },
    { emoji: "🙂", label: "Better", value: 4 },
    { emoji: "😍", label: "Excellent", value: 5 },
  ];

  const handleRatingClick = (e) => {
    e.stopPropagation();
    setShowRating(!showRating);
  };

  const handleEmojiClick = (value) => {
    setSelectedRating(value);
  };

  const handleSubmitRating = (e) => {
    e.stopPropagation();
    if (selectedRating) {
      toast.success(`Rating submitted: ${ratingEmojis[selectedRating - 1].label}!`);
      setShowRating(false);
      setSelectedRating(null);
    } else {
      toast.error("Please select a rating first");
    }
  };

  const handleCopyUrl = (e) => {
    e.stopPropagation();
    const url = "http://localhost:5173/newFranchise1/{franchiseListingId}";
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Listing url copied");
    }).catch(() => {
      toast.error("Failed to copy URL");
    });
  };

  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      toast.success("Bookmark saved");
    } else {
      toast.success("Bookmark removed");
    }
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
      className={`w-full max-w-[26rem] rounded-3xl p-4 shadow-md cursor-pointer ${animationClass}`}
       style={{
        background: `linear-gradient(to bottom, ${c}, #ffffff)`,
        animationDelay: animationDelay,
        animationFillMode: 'both'
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 my-4 h-16">
         <IKImage
              path={logoUrl}
              alt={title}
              className="w-14 h-14 rounded-lg object-cover transition-opacity duration-500 opacity-0"
              onLoad={(e) => e.target.classList.remove('opacity-0')}
              loading="lazy"
            />

        <div className="flex flex-col">
          <h2 className="font-semibold text-lg text-white">
            {title}{"\u00a0"}
            {verified && <MdVerified className="inline text-blue-400 text-lg mb-1" />}
          </h2>

          <p className="text-sm text-white/90">
            {since && `Since ${since}`} {location}
          </p>
        </div>

        {/* Rating */}
        {
            rating > 0 && (
                <div className="h-full mt-6 ml-auto flex items-start gap-1 text-sm font-medium">
          <IKImage 
            path="FranchiseHomePage/star-rating.png" 
            alt="rating"
            className="w-4 h-4"
            loading="lazy"
          />
          <span className="text-gray-700">{rating}</span>
        </div>

            )
        }
      </div>

      {/* Description */}
      {description && (
        <p className="mt-4 text-white/90 text-sm leading-5 px-3 mb-4 line-clamp-4 h-20">
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

      {/* Bottom Actions */}
      <div 
        onClick={(e) => e.stopPropagation()}
      className="mt-6 mb-3 bg-white/30 backdrop-blur-sm rounded-2xl px-4 py-1 flex items-center justify-between border border-white/50 relative">
        <div className="relative">
          <button className="p-2" onClick={handleRatingClick}>
            <IKImage path="FranchiseHomePage/d1.png" className="w-5 h-5" alt="action" loading="lazy" />
          </button>
          
          {/* Rating Dropdown */}
          {showRating && (
            <div 
              className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg p-4 z-50 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs text-gray-600 mb-2 font-medium">Rate this franchise</p>
              <div className="flex gap-2 mb-3">
                {ratingEmojis.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleEmojiClick(item.value)}
                    className={`text-2xl transition-all hovr:scale-110 ${
                      selectedRating === item.value ? 'scale-125' : ''
                    }`}
                    title={item.label}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSubmitRating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          )}
        </div>
        
        <button className="p-2" onClick={handleBookmark}>
          <IKImage 
            key={isBookmarked ? 'bookmarked' : 'unbookmarked'}
            path={isBookmarked ? "FranchiseHomePage/DetailsPageImages/book.png" : "FranchiseHomePage/d2.png"} 
            className="w-5 h-5 object-contain" 
            alt="action" 
            loading="lazy" 
          />
        </button>
        <button className="p-2" onClick={handleCopyUrl}>
          <IKImage path="FranchiseHomePage/d3.png" className="w-5 h-5" alt="action" loading="lazy" />
        </button>
        <button className="b-blue-600 p-1 rounded-full">
          <IKImage path="FranchiseHomePage/d4.png" className="w-9 h-9" alt="action" loading="lazy" />
        </button>
      </div>
    </div>
  );
}

// Helper grid to render items in rows of three on large screens
export function FcardGrid({
  items = [],
  className = "px-3 sm:px-6 lg:px-12 xl:px-20 py-6 sm:py-8 lg:py-10",
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
}) {
  const navigate = useNavigate();
  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className={gridClassName}>
        {items.map((item, idx) => (
          <Fcard
            key={item.slug || idx}
            {...item}
            onClick={() => navigate(item.title == "GolfEdge Academy" ? '/newFranchise2' : `/franchise/details/${item.slug || 'chai-point'}`)}
          />
        ))}
      </div>
    </div>
  );
}

// Utility to format numeric ranges (e.g., "600-1500 sq. ft.")
export const formatRange = (min, max, unit) => {
  if (!min || !max) return "";
  return `${min}-${max} ${unit}`;
};

// Standard mapper to convert Backend API data to Fcard props
export const mapFranchiseListingToCard = (data = []) => {
  const items = Array.isArray(data) ? data : data?.items || data?.franchises || [];
  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    title: item.brand || item.title || "",
    description: item.description || "",
    location: item.location || "",
    since: item.year_of_establishment || item.since || "",
    rating: item.rating || 0,
    tags: item.tags || [],
    category: item.category || "",
    verified: item.tags?.includes("Verified") || item.verified !== false,
    logoUrl: (() => {
      const getStr = (val) => typeof val === 'string' ? val : null;
      return getStr(item.logo?.square) || getStr(item.logo?.url) || getStr(item.logo) || 
             getStr(item.image?.square) || getStr(item.image?.url) || getStr(item.image) || 
             getStr(item.square) || getStr(item.logoUrl) || "https://via.placeholder.com/60";
    })(),
    stats: item.stats || {
      space: formatRange(
        item.space?.minSpace,
        item.space?.maxSpace,
        item.space?.spaceUnit
      ),
      outlets: item.no_of_outlets || item.stats?.outlets || "0",
      investment: formatRange(
        item.investmentRange?.minInvestment,
        item.investmentRange?.maxInvestment,
        item.investmentRange?.investmentUnit
      ),
    },
    c: item.color || item.c || "#4A53FA",
    slug: item.slug || "",
  }));
};
