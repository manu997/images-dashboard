import { useInfiniteQuery } from "@tanstack/react-query";
import { imagesWithPaginationQuery } from "../graphql/queries";
import { execute } from "../graphql/execute";

export const USE_GET_IMAGES_KEY = "getImagesWithPagination";

const GET_IMAGES_MAX_ITEMS = 9;

const useGetImages = ({ title = "" }) =>
  useInfiniteQuery({
    queryKey: [USE_GET_IMAGES_KEY, title],
    queryFn: ({ pageParam: lastPage }) =>
      execute(imagesWithPaginationQuery, {
        after: lastPage,
        first: GET_IMAGES_MAX_ITEMS,
        title,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.images?.pageInfo.endCursor,
  });

export default useGetImages;
