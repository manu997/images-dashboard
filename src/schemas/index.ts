import { z } from "zod"

export const imageSchema = z.object({
  author: z.string().optional(),
  createdAt: z.string().datetime(),
  id: z.string(),
  liked: z.boolean(),
  likesCount: z.number().int(),
  picture: z.string().url(),
  price: z.number().int(),
  title: z.string(),
  updatedAt: z.string().datetime(),
})

export const imageEdgeSchema = z.object({
  cursor: z.string(),
  node: imageSchema,
})

export const pageInfoSchema = z.object({
  endCursor: z.string().optional(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  startCursor: z.string().optional(),
})
