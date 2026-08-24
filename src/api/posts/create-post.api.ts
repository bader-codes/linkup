import type { CreatePostPayload } from "../../types/posts/create-post-payload";
import { apiClient } from "../client";

export const createPost = async ({ body, image }: CreatePostPayload) => {
  const formData = new FormData();

  if (body.trim()) {
    formData.append("body", body.trim());
  }

  if (image) {
    formData.append("image", image);
  }

  const { data } = await apiClient.post("/posts", formData, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  return data;
};
