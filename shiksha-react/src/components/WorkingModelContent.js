import React from 'react';
import BannerImage from "./BannerImagegql";
import SvgShikshaFlower from "./shiksha logo_flower_png.svg";
import ShikshaModel from "./shiksha-model.svg";
import "../index.css";
import { useInView, InView } from 'react-intersection-observer';

const WorkingModelContent = ({ baseUrl, currentLanguage, workingModelData }) => {
  return (
    <div>
      {workingModelData.length > 0 ? (
        workingModelData.map((node) => (
          <SingleWorkingModelContent
            key={node.id}
            node={node}
            baseUrl={baseUrl}
            currentLanguage={currentLanguage}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const SingleWorkingModelContent = ({ node, baseUrl, currentLanguage }) => {
  const { title, body, bannerImage, workingModelPointsSecti, workingModelTableSectio } = node.attributes;

  const colors = ["border-color-1", "border-color-2", "border-color-3"];
  const bg_colors = ["bg-color-1", "bg-color-2", "bg-color-3"];
  const textColors = ["text-color-1", "text-color-2", "text-color-3"];

  return (
    <section>
      <div className="relative z-0">
        <BannerImage imageUrl={bannerImage} />
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
            <div
              className="text-sm sm:text-base lg:text-[15px] text-center"
              dangerouslySetInnerHTML={{ __html: body }}
            />
            <div className="text-center mobileview pt-40 relative">
              <div className="w-full flex justify-center items-center">
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
              {workingModelPointsSecti.length > 0 ? (
                workingModelPointsSecti.map((paragraph, index) => {
                  const delay = (index + 1) * 500;
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

                  const textColorClass = textColors[index % textColors.length];

                  const paragraphFirst = index === 0 ? "max-w-[600px] inline-block" : "";
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
                              {paragraph.iconWithWorkingModelPo?.url && (
                                <img
                                  src={paragraph.iconWithWorkingModelPo.url}
                                  alt={paragraph.pointsTitle}
                                  className="w-8 mr-2 inline"
                                />
                              )}
                              {paragraph.pointsTitle}
                            </h3>
                          </div>
                          <p className={`text-sm sm:text-base lg:text-[15px] ${paragraphFirst}`}>
                            {paragraph.pointsDescription}
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
            <div className="flex flex-wrap pt-14">
              {workingModelTableSectio.length > 0 ? (
                workingModelTableSectio.map((tableSection, index) => (
                  <div key={tableSection.id} className={`md:w-1/3 mb-5 px-3`}>
                    <div
                      className={`border rounded-t-md h-full ${colors[index % colors.length]}`}
                    >
                      <h3
                        className={`text-center text-white text-xl mb-5 p-2.5 rounded-t-md uppercase ${bg_colors[index % bg_colors.length]}`}
                      >
                        {tableSection.tableTitle}
                      </h3>
                      <ul className="px-3">
                        {tableSection.tablePoints.map((point, idx) => (
                          <li
                            key={idx}
                            className={`py-1 text-base ${idx === tableSection.tablePoints.length - 1 ? '' : 'border-b'} ${colors[idx % colors.length]}`}
                          >
                            {point}
                          </li>
                        ))}
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
