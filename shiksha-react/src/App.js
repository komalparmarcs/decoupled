import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NodeContent from "./components/NodeContent";

// Define the base URL as a constant
const BASE_URL = 'https://shiksha-drupal.ddev.site:8443';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [pageNodeData, setPageNodeData] = useState([]);
  const [imageData, setImageData] = useState({});
  const [matchedNodes, setMatchedNodes] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language is English

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const language = location.pathname.startsWith('/hi') ? 'hi' : 'en';
    setCurrentLanguage(language);
  }, [location.pathname]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}${currentLanguage === 'en' ? '/jsonapi' : '/hi/jsonapi'}/menu_items/main`);
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, [currentLanguage]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${currentLanguage === 'en' ? '/jsonapi' : '/hi/jsonapi'}/node/page/?include=field_banner_image,field_image_about`);
        if (!response.ok) {
          throw new Error("Failed to fetch page items");
        }
        const data = await response.json();
        console.log('Page Data:', data); // Log the response for debugging
        setPageNodeData(data.data);

        // Extract image data from included relationships
        const includedImages = data.included.reduce((acc, item) => {
          if (item.type === 'file--file') {
            acc[item.id] = item.attributes.uri.url;
          }
          return acc;
        }, {});
        setImageData(includedImages);
      } catch (error) {
        console.error("Error fetching page items:", error);
      }
    };

    fetchPageData();
  }, [currentLanguage]);

  useEffect(() => {
    if (menuItems.length > 0 && pageNodeData.length > 0) {
      const matchedNodes = menuItems.map((menuItem) => {
        // Remove the /hi prefix from the menu item URL if present
        const url = menuItem.attributes.url.replace(/^\/hi/, '');
        const matchedNode = pageNodeData.find(
          (node) => node.attributes.path.alias === url
        );
        return {
          menuItem,
          matchedNode,
        };
      });
      console.log('Matched Nodes:', matchedNodes); // Log matched nodes for debugging
      setMatchedNodes(matchedNodes);
    }
  }, [menuItems, pageNodeData, currentLanguage]);

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
      <Routes>
        {matchedNodes.map(({ menuItem, matchedNode }, index) => (
          matchedNode ? (
            <Route 
              key={index} 
              path={currentLanguage === 'en' ? menuItem.attributes.url : `/hi${menuItem.attributes.url.replace(/^\/hi/, '')}`} 
              element={<NodeContent node={matchedNode} baseUrl={BASE_URL} imageData={imageData} currentLanguage={currentLanguage} />} 
            />
          ) : null
        ))}
      </Routes>
      {/* <Hero /> */}
    </div>
  );
};

export default App;
