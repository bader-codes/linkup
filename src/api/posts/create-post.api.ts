import type { CreatePostPayload } from "@/types/posts/create-post-payload";
import { apiClient } from "../client";

export const createPost = async ({ body, image }: CreatePostPayload) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  if (body.trim()) {
    formData.append("body", body.trim());
  }

  if (image) {
    formData.append("image", image);
  }

  const { data } = await apiClient.post("/posts", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
