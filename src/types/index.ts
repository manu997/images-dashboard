import type { z } from "zod"
import type { imageEdgeSchema, imageSchema, pageInfoSchema } from "../schemas"

export type Image = z.infer<typeof imageSchema>

export type ImageEdge = z.infer<typeof imageEdgeSchema>

export type PageInfo = z.infer<typeof pageInfoSchema>
