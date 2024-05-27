import React from 'react';
import Banner from './Banner';
import Description from './Description';

const Page = ({ data }) => {
  const pageData = data.data.attributes;
  const imageUrl = `https://shiksha-drupal.ddev.site:8443/sites/default/files/${data.data.id}.jpg`; // Adjust the URL as per actual path

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 bg-sky-500 hover:bg-sky-700">{pageData.title}</h1>
      <Banner imageUrl={imageUrl} />
      <Description body={pageData.body.processed} />
    </div>
  );
};

export default Page;
