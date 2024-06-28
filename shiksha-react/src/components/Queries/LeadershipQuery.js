import { gql } from '@apollo/client';

const LeadershipQuery = gql`
  query MyQuery {
    nodeLeaderships(first: 20) {
      nodes {
        id
        path
        post
        shortDescription
        title
        bannerImage {
        url
        }
        imageAbout {
          url
          alt
        }
        group {
          ... on TermPost {
            id
            name
          }
        }
        body {
          value
        }
      }
    }
  }
`;

export default LeadershipQuery;
