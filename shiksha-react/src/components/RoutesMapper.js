import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NodeContent from './NodeContent';
import WorkingModelContent from './WorkingModelContent';
import ReachandImpactContent from './ReachandImpactContent';
import { useBaseUrl } from '../contexts/BaseUrlContext';

const RoutesMapper = ({ matchedNodes, imageData, currentLanguage }) => {
  const BASE_URL = useBaseUrl();

  return (
    <Routes>
      {matchedNodes.map(({ menuItem, matchedNode }, index) => (
        matchedNode ? (
          <Route 
            key={index} 
            path={currentLanguage === 'en' ? menuItem.attributes.url : `/hi${menuItem.attributes.url.replace(/^\/hi/, '')}`} 
            element={
              matchedNode.type === 'node--working_model'
                ? <WorkingModelContent 
                    node={matchedNode} 
                    baseUrl={BASE_URL} 
                    imageData={imageData} 
                    currentLanguage={currentLanguage}
                  />
                : matchedNode.type === 'node--reach_and_impact'
                ? <ReachandImpactContent
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
                  />
            } 
          />
        ) : null
      ))}
    </Routes>
  );
};

export default RoutesMapper;
