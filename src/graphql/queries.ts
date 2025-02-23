import { gql } from "graphql-request";

export const ImagesWithPagination = gql`
  query GetImagesWithPagination(
        $after: String
        $first: Int
        $title: String
      ) {
        images(after: $after, first: $first title: $title) {
          edges {
              cursor,
              node {
                  author
                  liked
                  likesCount
                  picture
                  price
                  title
                  id
              }
          },
          pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
          }
        }
      }
`;
