import {
  type DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { execute } from "../graphql/execute";
import type {
  LikeImageMutation,
  LikeImageMutationVariables,
} from "../graphql/generated/graphql";
import { toggleLikeMutation } from "../graphql/queries";
import { USE_GET_IMAGES_KEY } from "./useGetImages";

const useLikeImage = () => {
  const queryClient = useQueryClient();

  return useMutation<
    LikeImageMutation,
    DefaultError,
    LikeImageMutationVariables
  >({
    mutationFn: (params) => execute(toggleLikeMutation, params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USE_GET_IMAGES_KEY] });
    },
  });
};

export default useLikeImage;
