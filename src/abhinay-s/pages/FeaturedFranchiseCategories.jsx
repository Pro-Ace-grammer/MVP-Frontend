import React from "react";
import { IKImage } from "imagekitio-react";
import { useNavigate } from "react-router-dom";

const FeaturedFranchiseCategories = ({
  title = "Featured food franchise categories",
  data = [],
  showViewMore = true,
}) => {
  const navigate = useNavigate();
  if (!Array.isArray(data) || data.length === 0) return null;
  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
      <p className="text-[#615E63] text-lg mb-8">
        Explore a wide variety of categories that suit every entrepreneurial interest.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-10">
        {data.map((item, index) => (
          <div key={item.id || index} className="group cursor-pointer">
            <div className="aspect-square rounded-[28px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 bg-gray-50">
              <IKImage
                path={item.image?.url}
                alt={item.image?.alt || item.brand}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="text-center mt-3">
              <p className="font-medium text-gray-800 group-hover:text-blue-600 transition truncate px-1 text-sm">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View more link */}
      {showViewMore && (
        <div className="mt-8 flex justify-end">
          <button 
            onClick={() => navigate('/franchise/industries')}
            className="text-[#3B82F6] text-sm font-medium hover:underline flex items-center gap-1 transition cursor-pointer"
          >
            View more →
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedFranchiseCategories;
