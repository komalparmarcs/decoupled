import { gql } from '@apollo/client';

const VisionandMissionQuery = gql`
  query MyQuery {
  nodeVissionAndMissions(first: 10) {
    nodes {
      __typename
      id
      title
      path
      bannerImage {
        url
      }
      visionAndMissionPoint {
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
    }
  }
}
`;

export default VisionandMissionQuery;
