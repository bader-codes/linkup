import { z } from "zod";

export const commentSchema = z
  .object({
    commentValue: z
      .string()
      .trim()
      .max(750, "Comment cannot exceed 750 characters")
      .optional(),

    image: z.instanceof(FileList).nullable(),
  })
  .refine((data) => Boolean(data.commentValue?.length) || data.image?.length, {
    message: "Comment must contain text or an image",
    path: ["commentValue"],
  });

export type CommentFormValues = z.infer<typeof commentSchema>;
