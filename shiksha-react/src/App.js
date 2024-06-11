import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NodeContent from "./components/NodeContent";
import WorkingModelContent from "./components/WorkingModelContent";
import ErrorBoundary from "./components/ErrorBoundary";

// Define the base URL as a constant
const BASE_URL = 'https://shiksha-drupal.ddev.site:8443';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Router>
  );
};

const AppContent = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [pageNodeData, setPageNodeData] = useState([]);
  const [workingModelData, setWorkingModelData] = useState([]);
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

    const fetchWorkingModelData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${currentLanguage === 'en' ? '/jsonapi' : '/hi/jsonapi'}/node/working_model?include=field_banner_image`);
        if (!response.ok) {
          throw new Error("Failed to fetch working model items");
        }
        const data = await response.json();
        setWorkingModelData(data.data);

        // Extract image data from included relationships
        const includedImages = data.included.reduce((acc, item) => {
          if (item.type === 'file--file') {
            acc[item.id] = item.attributes.uri.url;
          }
          return acc;
        }, {});
        setImageData(includedImages);
      } catch (error) {
        console.error("Error fetching working model items:", error);
      }
    };

    fetchPageData();
    fetchWorkingModelData();
  }, [currentLanguage]);

  useEffect(() => {
    if (menuItems.length > 0 && (pageNodeData.length > 0 || workingModelData.length > 0)) {
      const matchedNodes = menuItems.map((menuItem) => {
        // Remove the /hi prefix from the menu item URL if present
        const url = menuItem.attributes.url.replace(/^\/hi/, '');
        const matchedNode = pageNodeData.find(
          (node) => node.attributes.path.alias === url
        ) || workingModelData.find(
          (node) => node.attributes.path.alias === url
        );
        return {
          menuItem,
          matchedNode,
        };
      });
      setMatchedNodes(matchedNodes);
    }
  }, [menuItems, pageNodeData, workingModelData, currentLanguage]);

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
              element={
                matchedNode.type === 'node--working_model'
                  ? <WorkingModelContent 
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
    </div>
  );
};

export default App;
