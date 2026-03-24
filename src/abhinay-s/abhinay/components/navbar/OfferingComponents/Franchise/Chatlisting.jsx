import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { X, Loader2 } from 'lucide-react';
import { searchFranchise } from '../../../../../lib/api';
import { IKImage } from 'imagekitio-react';
import { MdVerified } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Franchise Card Component
const Fcard = ({
  location = "",
  title = "",
  since = "",
  logoUrl = "https://via.placeholder.com/60",
  description = "",
  rating = 4,
  tags = [],
  stats = { space: "", outlets: "", investment: "" },
  verified = false,
  c = "",
  slug = "",
  onClick,
}) => {
  const handleCopyUrl = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/franchise/details/${slug || 'chai-point'}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Listing url copied");
    }).catch(() => {
      toast.error("Failed to copy URL");
    });
  };

  return (
    <div
      onClick={onClick}
      className={`w-full max-w-[26rem] rounded-3xl p-4 shadow-md cursor-pointer`}
      style={{
        background: `linear-gradient(to bottom, ${c || '#fff'}, #ffffff)`
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
            <h2 className="font-semibold text-lg text-black">{title}</h2>
            {verified && <MdVerified className="text-blue-500 text-lg" />}
          </div>

          <p className="text-sm text-gray-700">
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
      {tags && tags.length > 0 && (
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
          <p className="text-sm font-semibold">{stats?.space || "-"}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <IKImage
            path="FranchiseHomePage/riil.png"
            alt="outlets"
            className="h-6 w-6"
            loading="lazy"
          />
          <p className="text-xs text-gray-500">No. of outlets</p>
          <p className="text-sm font-semibold">{stats?.outlets || "-"}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <IKImage
            path="FranchiseHomePage/rupee.png"
            alt="investment"
            className="h-6 w-6"
            loading="lazy"
          />
          <p className="text-xs text-gray-500">Investment</p>
          <p className="text-sm font-semibold">{stats?.investment || "-"}</p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="mt-6 mb-3 bg-white/30 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center justify-between border border-white/50"
      >
        <button className="cursor-pointer p-2">
          <IKImage path="FranchiseHomePage/d1.png" className="w-5 h-5" alt="action" loading="lazy" />
        </button>
        <button className="cursor-pointer p-2">
          <IKImage path="FranchiseHomePage/d2.png" className="w-5 h-5" alt="action" loading="lazy" />
        </button>
        <button className="cursor-pointer p-2" onClick={handleCopyUrl}>
          <IKImage path="FranchiseHomePage/d3.png" className="w-5 h-5" alt="action" loading="lazy" />
        </button>
        <button className="cursor-pointer bg-blue-600 p-2 rounded-full">
          <IKImage path="FranchiseHomePage/d4.png" className="w-5 h-5" alt="action" loading="lazy" />
        </button>
      </div>
    </div>
  );
};

const formatRange = (min, max, unit) => {
  if (!min || !max) return "";
  return `${min}-${max} ${unit}`;
};

// Map franchise data from API to card props
const mapFranchiseToCard = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    title: item.brand,
    description: item.description,
    location: item.location,
    since: item.year_of_establishment,
    rating: item.rating,
    tags: item.tags || [],
    category: item.category,
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

/**
 * Chatlisting - Franchise Search Component (Synced with Home Page Search Box)
 */
const Chatlisting = ({ 
    placeholder = "Search for franchises (e.g., ice-cream, pizza, coffee)...", 
    quickActions = []
}) => {
    const [query, setQuery] = useState("");
    const [franchises, setFranchises] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(true);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);
    const navigate = useNavigate();

    const textareaRef = useRef(null);
    const DEFAULT_HEIGHT = 71; // px
    const MAX_HEIGHT = 171; // px

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = DEFAULT_HEIGHT + "px";
        }
    }, []);

    const handleInput = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, MAX_HEIGHT) + "px";
        }
    };

    // Initialize SpeechRecognition
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setSpeechSupported(false);
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-IN';
            recognition.continuous = false;
            recognition.interimResults = true;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = (event) => {
                setIsListening(false);
                const msg =
                    event.error === 'not-allowed'
                        ? 'Microphone permission denied. Please allow access in your browser settings.'
                        : event.error === 'no-speech'
                            ? "Didn't catch that. Try speaking again."
                            : 'Voice input error. Please try again.';
                toast.error(msg);
            };

            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                const text = transcript.trim();
                if (text) setQuery(text);
            };

            recognitionRef.current = recognition;
        } catch (e) {
            setSpeechSupported(false);
            console.error('SpeechRecognition setup failed:', e);
        }

        return () => {
            try {
                if (recognitionRef.current) {
                    recognitionRef.current.onstart = null;
                    recognitionRef.current.onend = null;
                    recognitionRef.current.onerror = null;
                    recognitionRef.current.onresult = null;
                }
            } catch (e) {
                console.error('Cleanup error:', e);
            }
        };
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current || !speechSupported) return;

        try {
            if (isListening) {
                recognitionRef.current.stop();
            } else {
                recognitionRef.current.start();
            }
        } catch (e) {
            toast.error('Voice input failed. Try again.');
            setIsListening(false);
        }
    };

    const handleSubmit = () => {
        if (query.trim()) {
            navigate(`/franchise/searchlistingpage?query=${query}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setQuery("");
        setFranchises([]);
        inputRef.current?.focus();
    };

    const quickGo = (destination) => {
        const routes = {
            "show offerings": "/offerings",
            "pricing plans": "/pricings",
            "startups zone": "/startups-zone",
            "Investor page": "/startups-zone-investorhub",
            "franchise opportunities": "/franchise/oppurtunties"
        };

        const route = routes[destination];
        if (route) {
            navigate(route);
        }
    };

    const handleFranchiseClick = (franchise) => {
        navigate(`/franchise/details/${franchise.slug || 'chai-point'}`);
    };

    return (
        <div className="w-full">
            <Toaster position="bottom-center" />
            
            {/* SEARCH BOX CONTAINER - Swapped design to match NewChatbot.jsx */}
            <div className="max-w-2xl mx-auto px-4 py-2 shadow-xl rounded-[48px] border border-gray-300 bg-transparent">
                <div className="relative rounded-3xl px-4 py-2">
                    <div className="flex flex-col gap-2">
                        {/* INPUT ROW */}
                        <div className="flex items-center text-left">
                            {/* TEXTAREA */}
                            <div className="flex-[0.8] flex items-center">
                                <textarea
                                    ref={textareaRef}
                                    rows={1}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onInput={handleInput}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search for franchises (e.g., ice-cream, pizza, coffee)..."
                                    className="
                                        w-full text-sm text-gray-700 placeholder-gray-400
                                        bg-transparent outline-none border-none
                                        resize-none overflow-y-auto
                                        leading-5 flex items-center
                                    "
                                    style={{
                                        minHeight: `${DEFAULT_HEIGHT}px`,
                                        maxHeight: `${MAX_HEIGHT}px`,
                                        paddingTop: '28px'
                                    }}
                                />
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex-[0.2] flex items-center justify-end gap-2">
                                {/* MIC */}
                                <button
                                    onClick={toggleListening}
                                    disabled={!speechSupported}
                                    title="Speak your query"
                                    className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
                                >
                                    <svg
                                        width="14"
                                        height="20"
                                        viewBox="0 0 14 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 19V16.5M7 16.5C5.4 16.5 3.9 15.9 2.8 14.6
                                            C1.6 13.4 1 11.7 1 10
                                            M7 16.5C8.6 16.5 10.1 15.9 11.2 14.6
                                            C12.4 13.4 13 11.7 13 10
                                            M7 14.1C4.9 14.1 3.3 12.3 3.3 10.1V5
                                            C3.3 2.8 4.9 1 7 1
                                            C9.1 1 10.8 2.8 10.8 5V10.1
                                            C10.8 12.3 9.1 14.1 7 14.1Z"
                                            stroke={isListening ? "#ef4444" : "black"}
                                            strokeOpacity={isListening ? "0.8" : "0.3"}
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {/* SEND / CUBE */}
                                <button className="cursor-pointer" onClick={handleSubmit} disabled={isSearching || !query.trim()}>
                                    <div className="w-[46px] h-[46px] bg-white rounded-sm flex items-center justify-center p-1 opacity-90">
                                        <img
                                            src="/abhinay/HomePageImages/cube.png"
                                            alt="send"
                                            className="w-9 h-9 object-contain"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* ICON ROW */}
                        <div className="flex items-center gap-1 mt-1">
                            <div className="flex items-center bg-[#e8f6f6] rounded-[6px]">
                                <img
                                    src="/abhinay/aaaa.png"
                                    alt="A"
                                    className="w-8 h-8 px-1 rounded-[6px] cursor-pointer hover:bg-white transition"
                                    onClick={() => quickGo("show offerings")}
                                />
                            </div>

                            <div className="flex items-center gap-1 bg-[#FCEFE0] rounded-[6px] px-1">
                                <img
                                    src="https://ik.imagekit.io/lemiciiq/LeMiCi/location.png?updatedAt=1772785333478"
                                    alt="B"
                                    className="w-8 h-8 p-1 rounded-[6px] cursor-pointer hover:bg-white transition"
                                    onClick={() => quickGo("pricing plans")}
                                />

                                <img
                                    src="/abhinay/cccc.png"
                                    alt="C"
                                    className="w-8 h-8 p-1 rounded-[6px] cursor-pointer hover:bg-white transition"
                                    onClick={() => quickGo("startups zone")}
                                />
                            </div>

                            <div className="flex items-center gap-1 bg-[#F0EAF4] rounded-[6px] px-1">
                                <img
                                    src="/abhinay/dddd.png"
                                    alt="D"
                                    className="w-8 h-8 p-1 rounded-[6px] cursor-pointer hover:bg-white transition"
                                    onClick={() => quickGo("Investor page")}
                                />
                                <img
                                    src="/abhinay/eeee.png"
                                    alt="E"
                                    className="w-8 h-8 p-1 rounded-[6px] cursor-pointer hover:bg-white transition"
                                    onClick={() => quickGo("franchise opportunities")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RESULTS MODAL (Kept for search results if triggered in future) */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] bg-white overflow-hidden">
                    <div className="relative w-full h-full flex flex-col">
                        {/* Header with Close Button */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {isSearching ? 'Searching...' : `Search Results for "${query}"`}
                                </h2>
                                {!isSearching && franchises.length > 0 && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Found {franchises.length} franchise{franchises.length > 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Results Container */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {isSearching ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
                                    <p className="text-gray-600 text-lg">Searching for franchises...</p>
                                </div>
                            ) : franchises.length > 0 ? (
                                <div className="max-w-7xl mx-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {franchises.map((franchise, idx) => (
                                            <Fcard
                                                key={idx}
                                                {...franchise}
                                                onClick={() => handleFranchiseClick(franchise)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">No franchises found</h3>
                                    <p className="text-gray-600 mb-4">
                                        Try searching with different keywords like "coffee", "food", "retail", etc.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatlisting;
