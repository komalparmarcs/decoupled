import { useEffect } from 'react';
import { useBaseUrl } from '../../contexts/BaseUrlContext';

const WorkingModelDataFetcher = ({ setWorkingModelData, setImageData, currentLanguage }) => {
  const BASE_URL = useBaseUrl();

  useEffect(() => {
    const fetchWorkingModelData = async () => {
      try {
        const response = await fetch(`${BASE_URL}${currentLanguage === 'en' ? '/jsonapi' : '/hi/jsonapi'}/node/working_model?include=field_banner_image`);
        if (!response.ok) {
          throw new Error("Failed to fetch working model items");
        }
        const data = await response.json();
        setWorkingModelData(data.data);

        const includedImages = data.included.reduce((acc, item) => {
          if (item.type === 'file--file') {
            acc[item.id] = item.attributes.uri.url;
          }
          return acc;
        }, {});
        setImageData(prevImageData => ({ ...prevImageData, ...includedImages }));
      } catch (error) {
        console.error("Error fetching working model items:", error);
      }
    };

    fetchWorkingModelData();
  }, [currentLanguage, setWorkingModelData, setImageData, BASE_URL]);

  return null;
};

export default WorkingModelDataFetcher;
