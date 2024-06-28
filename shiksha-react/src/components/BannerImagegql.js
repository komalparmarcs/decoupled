import React from "react";

const BannerImagegql = ({ imageUrl }) => {
  if (!imageUrl) {
    return null;
  }

  const fullImageUrl = `${imageUrl}`;

  return (
    <div className="relative mb-4 pt-[72px]">
      <img
        src={fullImageUrl}
        alt="Banner"
        className="w-full h-auto object-cover lg:w-[1263.33px] lg:h-[367.16px]"
      />
    </div>
  );
};

export default BannerImagegql;
