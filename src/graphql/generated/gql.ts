/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetImagesWithPagination($after: String, $first: Int, $title: String) {\n  images(after: $after, first: $first, title: $title) {\n    edges {\n      cursor\n      node {\n        author\n        liked\n        likesCount\n        picture\n        price\n        title\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}": typeof types.GetImagesWithPaginationDocument,
    "\n  mutation LikeImage($imageId: ID!, $clientMutationId: String) {\n    likeImage(input: { imageId: $imageId, clientMutationId: $clientMutationId }) {\n      image {\n        author\n        id\n        liked\n        likesCount\n        picture\n        price\n        title\n      }\n      clientMutationId\n    }\n  }\n": typeof types.LikeImageDocument,
};
const documents: Documents = {
    "\n  query GetImagesWithPagination($after: String, $first: Int, $title: String) {\n  images(after: $after, first: $first, title: $title) {\n    edges {\n      cursor\n      node {\n        author\n        liked\n        likesCount\n        picture\n        price\n        title\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}": types.GetImagesWithPaginationDocument,
    "\n  mutation LikeImage($imageId: ID!, $clientMutationId: String) {\n    likeImage(input: { imageId: $imageId, clientMutationId: $clientMutationId }) {\n      image {\n        author\n        id\n        liked\n        likesCount\n        picture\n        price\n        title\n      }\n      clientMutationId\n    }\n  }\n": types.LikeImageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetImagesWithPagination($after: String, $first: Int, $title: String) {\n  images(after: $after, first: $first, title: $title) {\n    edges {\n      cursor\n      node {\n        author\n        liked\n        likesCount\n        picture\n        price\n        title\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}"): typeof import('./graphql').GetImagesWithPaginationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeImage($imageId: ID!, $clientMutationId: String) {\n    likeImage(input: { imageId: $imageId, clientMutationId: $clientMutationId }) {\n      image {\n        author\n        id\n        liked\n        likesCount\n        picture\n        price\n        title\n      }\n      clientMutationId\n    }\n  }\n"): typeof import('./graphql').LikeImageDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
