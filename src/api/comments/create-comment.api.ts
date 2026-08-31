import type { CreateCommentPayload } from "@/types/comments/create-comment-payload";
import { apiClient } from "../client";

export async function createComment(
  postId: string,
  payload: CreateCommentPayload,
) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  if (payload.content?.trim()) {
    formData.append("content", payload.content.trim());
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await apiClient.post(
    `/posts/${postId}/comments`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
}