import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NodeContent from './NodeContent';
import WorkingModelContent from './WorkingModelContent';
import ReachandImpactContent from './ReachandImpactContent';
import LeadershipList from './LeadershipList';
import LeadershipDetail from './LeadershipDetail';
import VisionandMissionContent from './VisionandMissionContent';
import { useBaseUrl } from '../contexts/BaseUrlContext';

const RoutesMapper = ({ matchedNodes, imageData, currentLanguage, leadershipData }) => {
  const BASE_URL = useBaseUrl();

  console.log('Matched Nodes:', matchedNodes);

  return (
    <Routes>
      {/* Leadership list and detail routes */}
      <Route path="/leadership-3/:leaderId" element={<LeadershipDetail leadershipData={leadershipData} />} />

      {/* Dynamically generated routes from matchedNodes */}
      {matchedNodes.map(({ menuItem, matchedNode }, index) => (
        matchedNode ? (
          <Route
            key={index}
            path={currentLanguage === 'en' ? menuItem.attributes.url : `/hi${menuItem.attributes.url.replace(/^\/hi/, '')}`}
            element={
              matchedNode.type === 'NodeWorkingModel'
                ? <WorkingModelContent
                    baseUrl={BASE_URL}
                    currentLanguage={currentLanguage}
                    workingModelData={[matchedNode]}
                  />
                : matchedNode.type === 'node--reach_and_impact'
                ? <ReachandImpactContent
                    node={matchedNode}
                    baseUrl={BASE_URL}
                    imageData={imageData}
                    currentLanguage={currentLanguage}
                  />
                : matchedNode.type === 'NodeVissionAndMission'
                ? <VisionandMissionContent
                    node={matchedNode}
                    baseUrl={BASE_URL}
                    imageData={imageData}
                    currentLanguage={currentLanguage}
                  />
                : <NodeContent
                    node={matchedNode}
                    baseUrl={BASE_URL}
                    imageData={imageData}
                    currentLanguage={currentLanguage}
                    leadershipData={leadershipData}
                  />
            }
          />
        ) : null
      ))}
    </Routes>
  );
};

export default RoutesMapper;
