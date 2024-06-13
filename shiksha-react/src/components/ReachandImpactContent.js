import React, { useEffect, useState } from "react";
import BannerImage from "./BannerImage";
import SvgShikshaFlower from "./shiksha logo_flower_png.svg";
import '../index.css'; // Import the custom CSS file

const ReachandImpactContent = ({ node, baseUrl, imageData, currentLanguage }) => {
  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch paragraph data
    const fetchParagraphs = async () => {
      try {
        const response = await fetch(`${baseUrl}/jsonapi/paragraph/reach_and_impact`);
        const data = await response.json();
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
  const { title } = node.attributes;
  const { field_banner_image } = node.relationships;

  // Determine banner image URL
  const bannerImageUrl = field_banner_image.data ? imageData[field_banner_image.data.id] : null;

  // Function to add padding-bottom to every paragraph
  const addPaddingBottomToParagraphs = (htmlString) => {
    // Wrap each paragraph inside a div with padding-bottom class
    return htmlString.replace(/<p([^>]*)>/g, '<div class="pb-3"><p$1>').replace(/<\/p>/g, '</p></div>');
  };

  // Animation for counting numbers
  const CountAnimation = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const step = Math.ceil(value / 100); // Calculate the step size
      const intervalDuration = 2000 / (value / step); // Adjust the interval duration dynamically

      const intervalId = setInterval(() => {
        setCount((prevCount) => {
          const nextCount = prevCount + step;
          if (nextCount >= value) {
            clearInterval(intervalId);
            return value;
          }
          return nextCount;
        });
      }, intervalDuration);

      return () => clearInterval(intervalId);
    }, [value]);

    return <>{count}</>;
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
        <section>
          <div className="container">
            <div className="flex flex-wrap -mx-4">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph) => (
                  <div className="md:w-1/4 mb-5 px-4" key={paragraph.id}>
                    <div className="h-full py-10 px-2.5 w-full shadow-lg text-center font-medium text-base text-custom-color">
                      <div className="mb-6">
                        <div className="text-[30px] text-navy-blue">
                          <CountAnimation value={parseInt(paragraph.attributes.field_number_of_reach_and_impact)} />
                          <sup>+</sup>
                        </div>
                        <p>{paragraph.attributes.field_title_of_reach_and_impact}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No details available.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReachandImpactContent;
