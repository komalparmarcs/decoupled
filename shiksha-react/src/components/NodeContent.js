import React from "react";
import BannerImage from "./BannerImage";
import AboutImage from "./AboutImage";
import SvgShikshaFlower from "./shiksha logo_flower_png.svg";
import '../index.css'; // Import the custom CSS file

const NodeContent = ({ node, baseUrl, imageData, currentLanguage }) => {
  if (!node) {
    // If content is undefined or null, display a loading indicator or an error message
    return <div>Loading...</div>;
  }

  // Destructure content if it's defined
  const { title, body } = node.attributes;
  const { field_banner_image, field_image_about } = node.relationships;

  // Determine banner image URL
  const bannerImageUrl = field_banner_image.data ? imageData[field_banner_image.data.id] : null;

  // Determine about image URL
  const aboutImageUrl = field_image_about.data ? imageData[field_image_about.data.id] : null;

  return (
    <div>
      <BannerImage baseUrl={baseUrl} imageUrl={bannerImageUrl} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold uppercase relative text-navy-blue text-center section-heading">
          {title}
          <div className="relative flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 line-with-image">
            <img src={SvgShikshaFlower} alt="headingflower" className="h-8 sm:h-10 lg:h-12 relative z-10 bg-white p-1 sm:p-2" />
          </div>
        </h2>
        <div className="mt-4 sm:mt-6 lg:mt-8">
          <div className="imggridwrap">
            <AboutImage baseUrl={baseUrl} imageUrl={aboutImageUrl} />
          </div>
          <div className="text-sm sm:text-base lg:text-[15px] text-justify" dangerouslySetInnerHTML={{ __html: body.value }} />
        </div>
      </div>
    </div>
  );
};

export default NodeContent;
