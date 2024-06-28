import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import VisionandMissionQuery from '../Queries/VisionandMissionQuery';

const VisionandMissionDataFetcher = ({ setVisionandMissionData }) => {
  const [loading, setLoading] = useState(true);

  const { data: VisionandMissionQueryData, loading: queryLoading, error } = useQuery(VisionandMissionQuery);

  useEffect(() => {
    if (VisionandMissionQueryData) {
      const formattedVisionandMissionData = VisionandMissionQueryData.nodeVissionAndMissions.nodes.map((node) => ({
        id: node.id,
        type: node.__typename, // Ensure typename is included
        attributes: {
          path: { alias: node.path }, // Correct the alias access
          title: node.title,
          bannerImage: node.bannerImage ? node.bannerImage.url : '', // Handle possible undefined bannerImage
          points: node.visionAndMissionPoint, // Corrected points key
        },
      }));
      console.log('Raw Query Data:', VisionandMissionQueryData);
      console.log('Formatted Data:', formattedVisionandMissionData);
      setVisionandMissionData(formattedVisionandMissionData);
      setLoading(false);
    }
  }, [VisionandMissionQueryData, setVisionandMissionData]);

  if (loading || queryLoading) {
    return <div>Loading Vision and Mission data...</div>;
  }

  if (error) {
    console.error('Error fetching Vision and Mission data:', error);
    return <div>Error fetching Vision and Mission data. Please try again later.</div>;
  }

  return null; // Assuming this component doesn't render any UI itself, it just fetches data
};

export default VisionandMissionDataFetcher;
