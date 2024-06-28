import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import WorkingModelQuery from '../Queries/WorkingModelQuery';

const WorkingModelDataFetcher = ({ setWorkingModelData }) => {
  const { data: WorkingModelQueryData, loading: queryLoading, error } = useQuery(WorkingModelQuery);

  useEffect(() => {
    if (WorkingModelQueryData) {
      const formattedWorkingModelData = WorkingModelQueryData.nodeWorkingModels.nodes.map((node) => ({
        id: node.id,
        type: node.__typename,
        attributes: {
          path: { alias: node.path },
          title: node.title,
          bannerImage: node.bannerImage ? node.bannerImage.url : '',
          body: node.body ? node.body.value : '',
          workingModelPointsSecti: node.workingModelPointsSecti,
          workingModelTableSectio: node.workingModelTableSectio,
        },
      }));
      console.log('Raw Query Data:', WorkingModelQueryData);
      console.log('Formatted Data:', formattedWorkingModelData);
      setWorkingModelData(formattedWorkingModelData);
    }
  }, [WorkingModelQueryData, setWorkingModelData]);

  if (queryLoading) {
    return <div>Loading Working Model data...</div>;
  }

  if (error) {
    console.error('Error fetching Working Model data:', error);
    return <div>Error fetching Working Model data. Please try again later.</div>;
  }

  return null;
};

export default WorkingModelDataFetcher;
