import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const MultilingualPage = ({ language }) => {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`https://shiksha-drupal.ddev.site:8443/${language}/jsonapi/node/page`);
        if (!response.ok) {
          throw new Error('Failed to fetch page content');
        }
        const data = await response.json();
        setPageContent(data);
      } catch (error) {
        console.error('Error fetching page content:', error);
      }
    };

    fetchPageContent();
  }, [language]);

  return (
    <div>
      {pageContent ? (
        <div>
          <h1><FormattedMessage id={pageContent.title} /></h1>
          <div><FormattedMessage id={pageContent.body} /></div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MultilingualPage;
