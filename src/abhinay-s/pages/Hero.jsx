import React from "react";

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      {/* Description */}
      <p className="max-w-2xl text-xs sm:text-sm leading-relaxed">
        {data.description}
      </p>
    </div>
  );
};

export default Hero;
