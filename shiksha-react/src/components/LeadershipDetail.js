import React from "react";
import { useParams } from "react-router-dom";

const LeadershipDetail = ({ leadershipData }) => {
  const { leaderId } = useParams();
  const leader = leadershipData.find(
    (l) => l.attributes.path.alias.split("/").pop() === leaderId
  );

  if (!leader) return <div>Leader not found</div>;

  return (
    <div className="relative z-0">
      <img src={leader.attributes.bannerImage} className="w-full h-auto object-cover lg:mt-[48px] lg:w-[1263.33px] lg:h-[173px]"/>
      <div className="container mt-6">
        <div className="flex items-center mb-[35px]">
        <div className="right-border-around relative w-[250px] mr-[40px] pt-15 pr-15 pb-0 pl-0">
        <img src={leader.attributes.imageAbout} alt={leader.attributes.title} className="relative w-full z-10"/>
        </div>
        <h1 className="text-[15px] font-bold"><strong className="block font-medium text-[22px] mb-[10px]">{leader.attributes.title}
        <span className="inline-block w-full ">{leader.attributes.post}</span></strong>
        </h1>
        </div>
        <div className="mb-10" dangerouslySetInnerHTML={{ __html: leader.attributes.body }} />
      </div>
    </div>
  );
};

export default LeadershipDetail;
