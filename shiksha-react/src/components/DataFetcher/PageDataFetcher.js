import { useEffect } from 'react';
import { useBaseUrl } from '../../contexts/BaseUrlContext';

const PageDataFetcher = ({ setPageNodeData, setImageData, currentLanguage }) => {
  const BASE_URL = useBaseUrl();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${currentLanguage === 'en' ? '/jsonapi' : '/hi/jsonapi'}/node/page/?include=field_banner_image,field_image_about`);
        if (!response.ok) {
          throw new Error("Failed to fetch page items");
        }
        const data = await response.json();
        setPageNodeData(data.data);

        const includedImages = data.included.reduce((acc, item) => {
          if (item.type === 'file--file') {
            acc[item.id] = item.attributes.uri.url;
          }
          return acc;
        }, {});
        setImageData(prevImageData => ({ ...prevImageData, ...includedImages }));
      } catch (error) {
        console.error("Error fetching page items:", error);
      }
    };

    fetchPageData();
  }, [currentLanguage, setPageNodeData, setImageData, BASE_URL]);

  return null;
};

export default PageDataFetcher;
