import type { GetCommentsResponse } from "@/types/comments/get-comments.response";
import { apiClient } from "../client";

export const getCommentsAPI = async (
  postId: string,
  page: number,
  limit: number,
): Promise<GetCommentsResponse> => {
  const token = localStorage.getItem("token");
  const { data } = await apiClient.get(`/posts/${postId}/comments`, {
    params: {
      page,
      limit,
    },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
