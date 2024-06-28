import React from "react";
import { Link } from "react-router-dom";

const LeadershipList = ({ leadershipData }) => {
  return (
    <section>
      <div className="bg-gray-300">
        <div className="container">
          <div className="flex flex-wrap pt-5">
            {leadershipData.map((leader) => {
              if (leader.attributes.group === 'Director') {
                return (
                  <div key={leader.id} className="md:w-1/3 mb-5 px-3">
                    <Link
                      className="group mt-[45px] block relative text-center overflow-hidden"
                      to={`/leadership-3/${leader.attributes.path.alias.split("/").pop()}`}
                    >
                      <div className="right-border-around relative w-full pt-15 pr-15 pb-0 pl-0">
                        <img
                          src={leader.attributes.imageAbout}
                          alt={leader.attributes.title}
                          className="relative w-full z-10"
                        />
                      </div>
                      <h2 className="text-[18px] text-[#263238] font-bold p-[40px_10px_20px] mt-[-20px] bg-[#ffffff]">
                        {leader.attributes.title}
                        <span className="text-base font-medium mt-1 block text-gray-700 h-12 overflow-hidden">
                          {leader.attributes.post}
                        </span>
                        <span className="text-base mt-1 block text-gray-700 font-normal h-12 overflow-hidden">
                          {leader.attributes.shortDescription}
                        </span>
                      </h2>
                      <div className="leader-cap absolute top-full left-0 w-full h-full bg-yellow-400 p-5 z-10 flex justify-center items-center transition-all duration-500 ease-in-out group-hover:top-0">
                        <p className="text-[#ffffff] text-[16px] pt-4">
                          <strong className="text-[19px] font-bold">
                            {leader.attributes.title}
                            <span className="block my-2 h-[130px] overflow-hidden">
                              {leader.attributes.post}
                            </span>
                          </strong>
                          <span>{leader.attributes.shortDescription}</span>
                          <svg viewBox="0 0 476.213 476.213" className="w-7 h-7 fill-white">
                            <polygon points="405.606,167.5 384.394,188.713 418.787,223.106 0,223.106 0,253.106 418.787,253.106 384.394,287.5 405.606,308.713 476.213,238.106 "></polygon>
                          </svg>
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container pt-[40px]">
          <ul className="box-border">
            {leadershipData.map((leader, index) => {
              if (leader.attributes.group === 'CTO') {
                return (
                  <li
                    key={leader.id}
                    className="text-[15px] text-[#263238] mb-[40px] border-b border-[#bcbcbc] min-h-[265px] relative"
                  >
                    <div
                      className={`right-border-around relative pt-15 pr-15 pb-0 pl-0 ${
                        index % 2 === 0 ? 'float-left mr-[40px]' : 'float-right ml-[40px]'
                      }`}
                    >
                      <img
                        src={leader.attributes.imageAbout}
                        alt={leader.attributes.title}
                        className="relative w-[250px] z-10"
                      />
                    </div>
                    <h2 className="text-[22px] text-[#263238] mb-4">
                      <strong>{leader.attributes.title}</strong>
                    </h2>
                    <div className="mb-14" dangerouslySetInnerHTML={{ __html: leader.attributes.body }} />
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LeadershipList;
