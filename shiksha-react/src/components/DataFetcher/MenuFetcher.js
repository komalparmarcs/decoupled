import { useEffect } from 'react';
import { useBaseUrl } from '../../contexts/BaseUrlContext';

const MenuFetcher = ({ setMenuItems, currentLanguage }) => {
  const BASE_URL = useBaseUrl();

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
  }, [currentLanguage, setMenuItems, BASE_URL]);

  return null;
};

export default MenuFetcher;
