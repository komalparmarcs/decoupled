import { gql } from "@apollo/client";

const WorkingModelQuery = gql`
  query MyQuery {
    nodeWorkingModels(first: 10, langcode: "") {
      nodes {
        __typename
        workingModelPointsSecti {
          ... on ParagraphWorkingModelPoint {
            id
            pointsDescription
            pointsTitle
            iconWithWorkingModelPo {
              url
              alt
            }
          }
        }
        workingModelTableSectio {
          ... on ParagraphWorkingModelTablePoint {
            id
            tablePoints
            tableTitle
          }
        }
        title
        path
        bannerImage {
          url
        }
        body {
          value
        }
      }
    }
  }
`;
export default WorkingModelQuery;
