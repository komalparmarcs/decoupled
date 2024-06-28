import React from "react";
import BannerImage from "./BannerImagegql";
import SvgShikshaFlower from "./shiksha logo_flower_png.svg";

const VisionandMissionContent = ({
  node,
  baseUrl,
  imageData,
  currentLanguage,
}) => {
  return (
    <div className="relative z-0">
      <BannerImage imageUrl={`${node.attributes.bannerImage}`} />
      <div className="container">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold uppercase relative text-navy-blue text-center section-heading">
          {node.attributes.title}
          <div className="relative flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 line-with-image">
            <img
              src={SvgShikshaFlower}
              alt="headingflower"
              className="h-8 sm:h-10 lg:h-12 relative z-10 bg-white p-1 sm:p-2"
            />
          </div>
        </h1>
        <ul className="box-border">
          {node.attributes.points.map((point, index) => (
            <li key={index} className="flex mb-6 sm:mb-8 lg:mb-10">
              <figure className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-white mr-4 sm:mr-6 lg:mr-8 h-auto shadow-md">
                <img
                  src={`${point.iconWithWorkingModelPo.url}`}
                  alt={point.iconWithWorkingModelPo.alt}
                  className="p-4 sm:p-5 lg:p-6 border border-solid border-[#0164ae] rounded-full max-w-none"
                />
              </figure>
              <div>
                <p className="text-sm sm:text-base lg:text-lg">
                  <strong className="font-bold mb-2 block text-lg sm:text-xl lg:text-2xl">
                    {point.pointsTitle}
                  </strong>
                  <span className="text-sm sm:text-base">{point.pointsDescription}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VisionandMissionContent;
