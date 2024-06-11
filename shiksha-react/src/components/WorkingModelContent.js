import React, { useEffect, useState } from "react";
import BannerImage from "./BannerImage";
import SvgShikshaFlower from "./shiksha logo_flower_png.svg";
import '../index.css'; // Import the custom CSS file

const WorkingModelContent = ({ node, baseUrl, imageData, currentLanguage }) => {
  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch paragraph data
    const fetchParagraphs = async () => {
      try {
        const response = await fetch(`${baseUrl}/jsonapi/paragraph/working_model_table_point`);
        const data = await response.json();
        console.log("Fetched paragraph data:", data); // Log the data to check its structure
        setParagraphs(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching paragraph data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchParagraphs();
  }, [baseUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!node) {
    // If content is undefined or null, display a loading indicator or an error message
    return <div>Loading...</div>;
  }

  // Destructure content if it's defined
  const { title, body } = node.attributes;
  const { field_banner_image } = node.relationships;

  // Determine banner image URL
  const bannerImageUrl = field_banner_image.data ? imageData[field_banner_image.data.id] : null;

  // Function to add padding-bottom to every paragraph
  const addPaddingBottomToParagraphs = (htmlString) => {
    // Wrap each paragraph inside a div with padding-bottom class
    return htmlString.replace(/<p([^>]*)>/g, '<div class="pb-3"><p$1>').replace(/<\/p>/g, '</p></div>');
  };

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
          {/* Render body content with padding-bottom for paragraphs */}
          <div className="text-sm sm:text-base lg:text-[15px] text-justify" dangerouslySetInnerHTML={{ __html: addPaddingBottomToParagraphs(body.value) }} />
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Working Model Details</h3>
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph) => (
                <div key={paragraph.id} className="mb-6">
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold">{paragraph.attributes.field_table_title}</h4>
                  <ul className="list-disc ml-5">
                    {paragraph.attributes.field_table_points.map((point, index) => (
                      <li key={index} className="text-sm sm:text-base lg:text-[15px]">{point}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingModelContent;
