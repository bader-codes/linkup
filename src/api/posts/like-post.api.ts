import type { LikePostResponse } from "@/types/posts/like-post.response";
import { apiClient } from "../client";

export const likePostAPI = async (
  postId: string,
): Promise<LikePostResponse> => {
  const token = localStorage.getItem("token");

  const response = await apiClient.put(
    `/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
