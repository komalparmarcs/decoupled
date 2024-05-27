import React from "react";

const AboutImage = ({ baseUrl, imageUrl }) => {
  if (!imageUrl) {
    return null;
  }
  const fullImageUrl = `${baseUrl}${imageUrl}`;
  return (
    <div className="mt-4">
      <img
        src={fullImageUrl}
        alt="About"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
};

export default AboutImage;
