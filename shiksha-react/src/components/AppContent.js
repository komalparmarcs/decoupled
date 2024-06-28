import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import MenuFetcher from './DataFetcher/MenuFetcher';
import PageDataFetcher from './DataFetcher/PageDataFetcher';
import WorkingModelDataFetcher from './DataFetcher/WorkingModelDataFetcher';
import ReachandImpactDataFetcher from './DataFetcher/ReachandImpactDataFetcher';
import RoutesMapper from './RoutesMapper';
import LeadershipDataFetcher from './DataFetcher/LeadershipDataFetcher';
import VisionandMissionDataFetcher from './DataFetcher/VisionandMissionDataFetcher';

const AppContent = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [pageNodeData, setPageNodeData] = useState([]);
  const [workingModelData, setWorkingModelData] = useState([]);
  const [reachandImpactData, setReachandImpactData] = useState([]);
  const [leadershipData, setLeadershipData] = useState([]);
  const [visionandMissionData, setVisionandMissionData] = useState([]);
  const [imageData, setImageData] = useState({});
  const [matchedNodes, setMatchedNodes] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      menuItems.length > 0 &&
      (pageNodeData.length > 0 ||
        workingModelData.length > 0 ||
        reachandImpactData.length > 0 ||
        leadershipData.length > 0 ||
        visionandMissionData.length > 0)
    ) {
      const matchedNodes = menuItems.map((menuItem) => {
        const url = menuItem.attributes.url.replace(/^\/hi/, '');
        const basePath = url.split('/').slice(0, 2).join('/'); // Extract the base path up to '/leadership-3'

        let matchedNode = null;

        matchedNode =
          pageNodeData.find((node) => node.attributes.path.alias && node.attributes.path.alias.startsWith(basePath)) ||
          workingModelData.find((node) => node.attributes.path.alias && node.attributes.path.alias.startsWith(basePath)) ||
          reachandImpactData.find((node) => node.attributes.path.alias && node.attributes.path.alias.startsWith(basePath)) ||
          visionandMissionData.find((node) => node.attributes.path.alias && node.attributes.path.alias.startsWith(basePath));

        return {
          menuItem,
          matchedNode,
        };
      });
      setMatchedNodes(matchedNodes);
    }
  }, [menuItems, pageNodeData, workingModelData, reachandImpactData, leadershipData, visionandMissionData, currentLanguage]);

  const switchLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    const newPath = newLanguage === 'en' ? location.pathname.replace('/hi', '') : `/hi${location.pathname}`;
    navigate(newPath);
  };

  return (
    <div>
      <Navbar
        menuItems={menuItems}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentLanguage={currentLanguage}
        switchLanguage={switchLanguage}
      />
      <MenuFetcher setMenuItems={setMenuItems} currentLanguage={currentLanguage} />
      <PageDataFetcher setPageNodeData={setPageNodeData} setImageData={setImageData} currentLanguage={currentLanguage} />
      <WorkingModelDataFetcher setWorkingModelData={setWorkingModelData} setImageData={setImageData} currentLanguage={currentLanguage} />
      <ReachandImpactDataFetcher setReachandImpactData={setReachandImpactData} setImageData={setImageData} currentLanguage={currentLanguage} />
      <LeadershipDataFetcher setLeadershipData={setLeadershipData} /> {/* Fetch leadership data */}
      <VisionandMissionDataFetcher setVisionandMissionData={setVisionandMissionData} />
      <RoutesMapper matchedNodes={matchedNodes} imageData={imageData} currentLanguage={currentLanguage} leadershipData={leadershipData} />
    </div>
  );
};

export default AppContent;
