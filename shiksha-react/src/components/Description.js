import React from 'react';

const Description = ({ body }) => {
  return (
    <div className="description" dangerouslySetInnerHTML={{ __html: body }}></div>
  );
};

export default Description;
