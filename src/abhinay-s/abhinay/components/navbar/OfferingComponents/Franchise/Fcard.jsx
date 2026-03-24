import { MdVerified } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import toast, { Toaster } from "react-hot-toast";
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
  slug = "",
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
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState("");

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
      className={`w-full max-w-[26rem] rounded-3xl p-4 shadow-sm cursor-pointer ${animationClass}`}
      style={{
        background: `linear-gradient(to bottom, ${c}, ${c}0a)`,
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
        className="mt-6 mb-3 bg-white/70 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center justify-between border border-white/60 relative shadow-sm">
        <div className="relative flex items-center">
          <button className="p-2 transition-transform hover:scale-110" onClick={handleRatingClick}>
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

        <button className="p-2 transition-transform hover:scale-110" onClick={handleBookmark}>
          <IKImage
            key={isBookmarked ? 'bookmarked' : 'unbookmarked'}
            path={isBookmarked ? "FranchiseHomePage/DetailsPageImages/book.png" : "FranchiseHomePage/d2.png"}
            className="w-5 h-5 object-contain"
            alt="action"
            loading="lazy"
          />
        </button>
        <button className="p-2 transition-transform hover:scale-110" onClick={handleCopyUrl}>
          <IKImage path="FranchiseHomePage/d3.png" className="w-5 h-5" alt="action" loading="lazy" />
        </button>
        <button className="cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center">
          <IKImage path="FranchiseHomePage/icons/send_query.png" className="w-8 h-8 sm:w-8.5 sm:h-8.5" alt="action" loading="lazy" />
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
      const g = (v) => {
        if (!v) return null;
        if (typeof v === "string") return v;
        if (typeof v.url === "string") return v.url;
        if (typeof v.square === "string") return v.square;
        return null;
      };
      return g(item.logo?.square) || g(item.logo?.url) || g(item.logo) ||
        g(item.image?.square) || g(item.image?.url) || g(item.image) ||
        g(item.square) || g(item.logoUrl) || "https://via.placeholder.com/60";
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
