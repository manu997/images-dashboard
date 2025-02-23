import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { z } from "zod";
import { imageSchema } from "../schemas";
import { USE_GET_IMAGES_KEY } from "./useGetImages";
import { environments } from "../environments";

export interface LikeImageParams {
  imageId: string;
  clientMutationId?: string;
}

const likeImageResponse = z.object({
  likeImage: z.object({
    image: imageSchema,
    clientMutationId: z.string().nullable(),
  }),
});

export type LikeImageResponse = z.infer<typeof likeImageResponse>;

const likeImage = async ({ imageId, clientMutationId }: LikeImageParams) => {
  const data = await request<LikeImageResponse>(
    environments.GRAPHQL_BASE_URL,
    gql`
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
    `,
    {
      imageId,
      clientMutationId,
    },
  );

  const { data: parsedData, error } = likeImageResponse.safeParse(data);

  if (error) {
    console.error(error.errors);
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }

  return parsedData.likeImage;
};

export const USE_TOGGLE_LIKE_IMAGE_KEY = "likeImage";

const useLikeImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [USE_TOGGLE_LIKE_IMAGE_KEY],
    mutationFn: likeImage,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [USE_GET_IMAGES_KEY] });
    },
  });
};

export default useLikeImage;
