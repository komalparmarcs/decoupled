import React from "react";
import BannerImage from "./BannerImage";
import AboutImage from "./AboutImage";
import SvgShikshaFlower from "./shiksha logo_flower_png.svg";
import LeadershipList from "./LeadershipList"; // Import LeadershipList component
import '../index.css'; // Import the custom CSS file

const NodeContent = ({ node, baseUrl, imageData, currentLanguage, leadershipData = [] }) => {
  if (!node) {
    // If content is undefined or null, display a loading indicator or an error message
    return <div>Loading...</div>;
  }

  // Destructure content if it's defined
  const { title, body } = node.attributes;
  // const relationships = node.relationships || {}; // Ensure relationships is defined
  const { field_banner_image, field_image_about } = node.relationships;

  // Determine banner image URL
  const bannerImageUrl = field_banner_image?.data ? imageData[field_banner_image.data.id] : null;

  // Determine about image URL
  const aboutImageUrl = field_image_about?.data ? imageData[field_image_about.data.id] : null;

  // Function to add padding-bottom to every paragraph
  const addPaddingBottomToParagraphs = (htmlString) => {
    if (!htmlString) return ''; // Return an empty string if htmlString is undefined or null
    // Wrap each paragraph inside a div with padding-bottom class
    return htmlString.replace(/<p([^>]*)>/g, '<div class="pb-3"><p$1>').replace(/<\/p>/g, '</p></div>');
  };

  // Check if the current node's path is under /leadership-3
  const isLeadershipPath = node.attributes.path.alias.startsWith('/leadership-3');

  return (
    <div className="relative z-0">
      <BannerImage baseUrl={baseUrl} imageUrl={bannerImageUrl} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold uppercase relative text-navy-blue text-center section-heading">
          {title}
          <div className="relative flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 line-with-image">
            <img src={SvgShikshaFlower} alt="headingflower" className="h-8 sm:h-10 lg:h-12 relative z-10 bg-white p-1 sm:p-2" />
          </div>
        </h2>
        <div className="mt-4 sm:mt-6 lg:mt-8 pb-8">
          <div className="imggridwrap">
            <AboutImage baseUrl={baseUrl} imageUrl={aboutImageUrl} />
          </div>
          {/* Render body content with padding-bottom for paragraphs */}
          <div className="text-sm sm:text-base lg:text-[15px] text-justify" dangerouslySetInnerHTML={{ __html: addPaddingBottomToParagraphs(body?.value) }} />
        </div>
      </div>
      {/* Conditionally render the LeadershipList component */}
      {isLeadershipPath && <LeadershipList leadershipData={leadershipData} />}
    </div>
  );
};

export default NodeContent;
