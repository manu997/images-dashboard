import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { z } from "zod";
import { imageEdgeSchema, pageInfoSchema } from "../schemas";

export interface GetImagesWithPaginationParams {
  after: string;
  first: number;
}

const getImagesWithPaginationResponse = z.object({
  images: z.object({
    edges: imageEdgeSchema.array(),
    pageInfo: pageInfoSchema,
  }),
});

export type GetImagesWithPaginationResponse = z.infer<
  typeof getImagesWithPaginationResponse
>;

const getImagesWithPagination = async ({
  after,
  first,
}: GetImagesWithPaginationParams) => {
  const data = await request<GetImagesWithPaginationResponse>(
    "https://sandbox-api-test.samyroad.com/graphql",
    gql`
      query GetImagesWithPagination(
        $after: String
        $first: Int
      ) {
        images(after: $after, first: $first) {
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
    `,
    {
      after,
      first,
    },
  );

  const { data: parsedData, error } =
    getImagesWithPaginationResponse.safeParse(data);

  if (error) {
    console.error(error.errors);
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }

  return parsedData;
};

export const USE_GET_IMAGES_KEY = "getImagesWithPagination";

const useGetImages = ({ after, first }: GetImagesWithPaginationParams) =>
  useQuery({
    queryKey: [USE_GET_IMAGES_KEY, { after, first }],
    queryFn: () => getImagesWithPagination({ after, first }),
  });

export default useGetImages;
