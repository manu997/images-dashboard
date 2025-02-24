import { graphql } from "./generated/gql";

export const imagesWithPaginationQuery = graphql(`
  query GetImagesWithPagination($after: String, $first: Int, $title: String) {
  images(after: $after, first: $first, title: $title) {
    edges {
      cursor
      node {
        author
        liked
        likesCount
        picture
        price
        title
        id
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}`);

export const toggleLikeMutation = graphql(`
  mutation LikeImage($imageId: ID!, $clientMutationId: String) {
    likeImage(input: { imageId: $imageId, clientMutationId: $clientMutationId }) {
      image {
        author
        id
        liked
        likesCount
        picture
        price
        title
      }
      clientMutationId
    }
  }
`);
