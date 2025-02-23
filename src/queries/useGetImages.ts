import { useInfiniteQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { z } from "zod";
import { environments } from "../environments";
import { ImagesWithPagination } from "../graphql/queries";
import { imageEdgeSchema, pageInfoSchema } from "../schemas";

export interface GetImagesWithPaginationParams {
  after: string;
  first: number;
  title?: string;
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
  title,
}: GetImagesWithPaginationParams) => {
  try {
    const data = await request<GetImagesWithPaginationResponse>(
      environments.GRAPHQL_BASE_URL,
      ImagesWithPagination,
      {
        after,
        first,
        title,
      },
    );

    const { data: parsedData, error } =
      getImagesWithPaginationResponse.safeParse(data);

    if (error) {
      console.error(error.errors);
      throw new Error(error.errors.map((e) => e.message).join(", "));
    }

    return parsedData;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching images.");
  }
};

export const USE_GET_IMAGES_KEY = "getImagesWithPagination";

const GET_IMAGES_MAX_ITEMS = 9;

const useGetImages = ({
  title = "",
}: Pick<GetImagesWithPaginationParams, "title">) =>
  useInfiniteQuery({
    queryKey: [USE_GET_IMAGES_KEY, title],
    queryFn: ({ pageParam }) =>
      getImagesWithPagination({
        after: pageParam,
        first: GET_IMAGES_MAX_ITEMS,
        title,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.images.pageInfo.endCursor,
  });

export default useGetImages;
