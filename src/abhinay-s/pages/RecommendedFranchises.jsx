import { Star, TrendingUp, BookOpen, Activity, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecommendedFranchises = () => {
  const navigate = useNavigate();

  const staticData = [
    {
      id: 1,
      brand: "KidZee",
      category: "Education & Training",
      rating: "4.5",
      investment: "₹15-25L",
      roi: "18-24 months",
      logo: <BookOpen className="text-black w-7 h-7" />,
      logoBg: "bg-gray-100",
      slug: "kidzee",
    },
    {
      id: 2,
      brand: "Jetts India",
      category: "Fitness & Wellness",
      rating: "4.5",
      investment: "₹25-45L",
      roi: "24-36 months",
      logo: <Activity className="text-red-500 w-7 h-7 rotate-45" />,
      logoBg: "bg-red-50",
      slug: "jetts-india",
    },
    {
      id: 3,
      brand: "Carzspa",
      category: "Automotive",
      rating: "4.5",
      investment: "₹35-45L",
      roi: "20-30 months",
      logo: <Car className="text-purple-600 w-7 h-7" />,
      logoBg: "bg-purple-50",
      slug: "carzspa",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
      {staticData.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-[28px] border border-gray-100 p-6 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group"
          onClick={() => navigate(`/franchise/${item.slug}`)}
        >
          {/* Header: Logo & Trending */}
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 ${item.logoBg} rounded-xl flex items-center justify-center`}>
              {item.logo}
            </div>
            <div className="flex items-center gap-1.5 text-[#00C07F] bg-[#00C07F]/5 px-3 py-1.5 rounded-full text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending</span>
            </div>
          </div>

          {/* Body: Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {item.brand}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{item.category}</p>
            <div className="flex items-center gap-1 mt-2.5">
              <Star className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
              <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
            </div>
          </div>

          {/* Details: Investment & ROI */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#F8F9FA] rounded-2xl p-4">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">Investment</p>
              <p className="text-sm font-bold text-gray-900">{item.investment}</p>
            </div>
            <div className="bg-[#F8F9FA] rounded-2xl p-4">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">ROI Period</p>
              <p className="text-sm font-bold text-gray-900">{item.roi}</p>
            </div>
          </div>

          {/* Footer: Action */}
          <button
            className="w-full bg-[#4A53FA] text-white py-3.5 rounded-2xl font-bold hover:bg-[#3b44e0] transition-colors shadow-lg shadow-blue-500/10 active:scale-[0.98]"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/franchise/${item.slug}`);
            }}
          >
            Explore
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecommendedFranchises;
