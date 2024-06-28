import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import LeadershipQuery from '../Queries/LeadershipQuery';

const LeadershipDataFetcher = ({ setLeadershipData }) => {
  const [loading, setLoading] = useState(true);

  const { data: leadershipQueryData, loading: queryLoading, error } = useQuery(LeadershipQuery);

  useEffect(() => {
    if (leadershipQueryData) {
      const formattedLeadershipData = leadershipQueryData.nodeLeaderships.nodes.map((node) => ({
        id: node.id,
        attributes: {
          path: { alias: node.path },
          post: node.post,
          shortDescription: node.shortDescription,
          title: node.title,
          imageAbout: node.imageAbout.url,
          body: node.body.value,
          group: node.group.name,
          bannerImage: node.bannerImage.url,
        },
      }));
      // console.log(formattedLeadershipData);
      setLeadershipData(formattedLeadershipData);
      setLoading(false);
    }
  }, [leadershipQueryData, setLeadershipData]);

  if (loading || queryLoading) {
    return <div>Loading leadership data...</div>;
  }

  if (error) {
    console.error('Error fetching leadership data:', error);
    return <div>Error fetching leadership data. Please try again later.</div>;
  }

  return null; // Assuming this component doesn't render any UI itself, it just fetches data
};

export default LeadershipDataFetcher;
