import React from "react";

const BannerImage = ({ baseUrl, imageUrl }) => {
  if (!imageUrl) {
    return null;
  }

  const fullImageUrl = `${baseUrl}${imageUrl}`;

  return (
    <div className="relative mb-4 pt-16">
      <img
        src={fullImageUrl}
        alt="Banner"
        className="w-full h-auto object-cover lg:w-[1263.33px] lg:h-[367.16px]"
      />
    </div>
  );
};

export default BannerImage;
