import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import MenuFetcher from './DataFetcher/MenuFetcher';
import PageDataFetcher from './DataFetcher/PageDataFetcher';
import WorkingModelDataFetcher from './DataFetcher/WorkingModelDataFetcher';
import ReachandImpactDataFetcher from './DataFetcher/ReachandImpactDataFetcher';
import RoutesMapper from './RoutesMapper';

const AppContent = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [pageNodeData, setPageNodeData] = useState([]);
  const [workingModelData, setWorkingModelData] = useState([]);
  const [reachandImpactData, setReachandImpactData] = useState([]);
  const [imageData, setImageData] = useState({});
  const [matchedNodes, setMatchedNodes] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const language = location.pathname.startsWith('/hi') ? 'hi' : 'en';
    setCurrentLanguage(language);
  }, [location.pathname]);

  useEffect(() => {
    if (menuItems.length > 0 && (pageNodeData.length > 0 || workingModelData.length > 0 || reachandImpactData.length > 0)) {
      const matchedNodes = menuItems.map((menuItem) => {
        const url = menuItem.attributes.url.replace(/^\/hi/, '');
        const matchedNode = pageNodeData.find(
          (node) => node.attributes.path.alias === url
        ) || workingModelData.find(
          (node) => node.attributes.path.alias === url
        ) || reachandImpactData.find(
            (node) => node.attributes.path.alias === url
        );
        return {
          menuItem,
          matchedNode,
        };
      });
      setMatchedNodes(matchedNodes);
    }
  }, [menuItems, pageNodeData, workingModelData, reachandImpactData, currentLanguage]);

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
      <RoutesMapper matchedNodes={matchedNodes} imageData={imageData} currentLanguage={currentLanguage} />
    </div>
  );
};

export default AppContent;
