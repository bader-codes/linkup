import { apiClient } from "../client";

export const deletePost = (postId: string) => {
  const token = localStorage.getItem("token");

  return apiClient.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};