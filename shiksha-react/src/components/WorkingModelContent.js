import React, { useEffect, useState } from "react";
import BannerImage from "./BannerImage";
import SvgShikshaFlower from "./shiksha logo_flower_png.svg";
import ShikshaModel from "./shiksha-model.svg";
import "../index.css"; // Import the custom CSS file
import { useInView, InView } from 'react-intersection-observer';

const WorkingModelContent = ({ node, baseUrl, imageData, currentLanguage }) => {
  const [paragraphs, setParagraphs] = useState([]);
  const [additionalParagraphs, setAdditionalParagraphs] = useState([]);
  const [includedData, setIncludedData] = useState({});
  const [loadingParagraphs, setLoadingParagraphs] = useState(true);
  const [loadingAdditional, setLoadingAdditional] = useState(true);
  const [errorParagraphs, setErrorParagraphs] = useState(null);
  const [errorAdditional, setErrorAdditional] = useState(null);

  useEffect(() => {
    const fetchParagraphs = async () => {
      try {
        const response = await fetch(
          `${baseUrl}${currentLanguage === 'en' ? '/jsonapi' : '/hi/jsonapi'}/paragraph/working_model_table_point`
        );
        const data = await response.json();
        setParagraphs(data.data);
        setLoadingParagraphs(false);
      } catch (error) {
        console.error("Error fetching paragraph data:", error);
        setErrorParagraphs(error);
        setLoadingParagraphs(false);
      }
    };

    fetchParagraphs();
  }, [baseUrl]);

  useEffect(() => {
    const fetchAdditionalParagraphs = async () => {
      try {
        const response2 = await fetch(
          `${baseUrl}${currentLanguage === 'en' ? '/jsonapi' : '/hi/jsonapi'}/paragraph/working_model_point/?include=field_icon_with_working_model_po`
        );
        const data2 = await response2.json();

        // Create a map of included data
        const includedMap = data2.included.reduce((acc, item) => {
          acc[item.id] = item.attributes.uri.url;
          return acc;
        }, {});

        setAdditionalParagraphs(data2.data);
        setIncludedData(includedMap);
        setLoadingAdditional(false);
      } catch (error) {
        console.error("Error fetching additional paragraph data:", error);
        setErrorAdditional(error);
        setLoadingAdditional(false);
      }
    };

    fetchAdditionalParagraphs();
  }, [baseUrl]);

  if (loadingParagraphs || loadingAdditional) {
    return <div>Loading...</div>;
  }

  if (errorParagraphs) {
    return <div>Error loading paragraph data: {errorParagraphs.message}</div>;
  }

  if (errorAdditional) {
    return (
      <div>
        Error loading additional paragraph data: {errorAdditional.message}
      </div>
    );
  }

  if (!node) {
    return <div>Loading...</div>;
  }

  const { title, body } = node.attributes;
  const { field_banner_image } = node.relationships;
  const bannerImageUrl = field_banner_image.data
    ? imageData[field_banner_image.data.id]
    : null;

  // Function to add padding-bottom to every paragraph
  const addPaddingBottomToParagraphs = (htmlString) => {
    return htmlString
      .replace(/<p([^>]*)>/g, '<div class="pb-3"><p$1>')
      .replace(/<\/p>/g, "</p></div>");
  };

  const colors = ["border-color-1", "border-color-2", "border-color-3"];
  const bg_color = ["bg-color-1", "bg-color-2", "bg-color-3"];
  const textColors = ["text-color-1", "text-color-2", "text-color-3"]; // Add text color classes here

  return (
    <section>
      <div className="relative z-0">
        <BannerImage baseUrl={baseUrl} imageUrl={bannerImageUrl} />
        <div className="container">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold uppercase relative text-navy-blue text-center section-heading">
            {title}
            <div className="relative flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 line-with-image">
              <img
                src={SvgShikshaFlower}
                alt="headingflower"
                className="h-8 sm:h-10 lg:h-12 relative z-10 bg-white p-1 sm:p-2"
              />
            </div>
          </h2>
          <div className="mt-4 sm:mt-6 lg:mt-2 pb-8">
            {/* Render body content with padding-bottom for paragraphs */}
            <div
              className="text-sm sm:text-base lg:text-[15px] text-center"
              dangerouslySetInnerHTML={{
                __html: addPaddingBottomToParagraphs(body.value),
              }}
            />
            <div className="text-center mobileview pt-40 relative">
              <div className="w-full  flex justify-center items-center">
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <figure ref={ref} className={`relative animate-zoomIn ${inView ? 'visible' : ''}`}>
                      <img
                        className="w-full"
                        src={ShikshaModel}
                        alt="Shiksha Model"
                      />
                      <figcaption className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 text-4xl text-black font-bold">
                        SHIKSHA <br /> MODEL
                      </figcaption>
                    </figure>
                  )}
                </InView>
              </div>
              {additionalParagraphs.length > 0 ? (
                additionalParagraphs.map((paragraph, index) => {
                  const iconData =
                    paragraph.relationships.field_icon_with_working_model_po
                      ?.data;
                  const iconUrl = iconData
                    ? `${baseUrl}${includedData[iconData.id]}`
                    : null;

                  const delay = (index + 1) * 500; // Incremental delay for each item
                  let animationClass = "";
                  let positionClass = "";

                  if (index % 3 === 0) {
                    animationClass = `animate-fadeInUp delay-${delay}`;
                    positionClass = "sm:absolute sm:top-0 sm:left-0 sm:w-full";
                  } else if (index % 3 === 1) {
                    animationClass = `animate-fadeInLeft delay-${delay}`;
                    positionClass = "sm:absolute sm:top-[185px] sm:right-0 sm:w-[30%] sm:text-left";
                  } else if (index % 3 === 2) {
                    animationClass = `animate-fadeInRight delay-${delay}`;
                    positionClass = "sm:absolute sm:top-[185px] sm:left-0 sm:w-[30%] sm:text-left";
                  }

                  const textColorClass = textColors[index % textColors.length]; // Assign text color based on index

                  // Determine Tailwind classes based on index
                  const paragraphfirst = index === 0 ? "max-w-[600px] inline-block" : "";
                  return (
                    <InView key={paragraph.id} triggerOnce>
                      {({ inView, ref }) => (
                        <div
                          ref={ref}
                          className={`mb-6 visible ${inView ? animationClass : ''} ${positionClass}`}
                        >
                          <div className={`mb-4`}>
                            <h3
                              className={`text-lg sm:text-xl lg:text-2xl leading-normal tracking-tight mb-1 font-bold ${textColorClass}`}
                            >
                              {iconUrl && (
                                <img
                                  src={iconUrl}
                                  alt={paragraph.attributes.field_points_title}
                                  className="w-8 mr-2 inline"
                                />
                              )}
                              {paragraph.attributes.field_points_title}
                            </h3>
                          </div>
                          <p className={`text-sm sm:text-base lg:text-[15px] ${paragraphfirst}`}>
                            {paragraph.attributes.field_points_description}
                          </p>
                        </div>
                      )}
                    </InView>
                  );
                })
              ) : (
                <p>No details available.</p>
              )}
            </div>
            </div>
            </div>
            <div className="bg-gray-300">
            <div className="container">
              <div className="flex flex-wrap bg-gray-300 pt-14">
                {paragraphs.length > 0 ? (
                  paragraphs.map((paragraph, index) => (
                    <div key={paragraph.id} className={`md:w-1/3 mb-5 px-3`}>
                      <div
                        className={`border rounded-t-md h-full ${
                          colors[index % colors.length]
                        }`}
                      >
                        <h3
                          className={`text-center text-white text-xl mb-5 p-2.5 rounded-t-md uppercase ${
                            bg_color[index % colors.length]
                          }`}
                        >
                          {paragraph.attributes.field_table_title}
                        </h3>
                        <ul className="px-3">
                          {paragraph.attributes.field_table_points.map(
                            (point, index) => (
                              <li
                                key={index}
                                className={`py-1 text-base ${index === paragraph.attributes.field_table_points.length - 1 ? '' : 'border-b '} ${colors[index % colors.length]}`}
                              >
                                {point}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No details available.</p>
                )}
              </div>
            </div>
            </div>
          </div>
    </section>
  );
};

export default WorkingModelContent;
