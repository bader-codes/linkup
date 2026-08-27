import type { GetAllPostsResponse } from "@/types/posts/get-all-posts.response";
import { apiClient } from "../client";

export const getAllPostsAPI = async (
  page: number,
  limit: number,
): Promise<GetAllPostsResponse> => {
  const token = localStorage.getItem("token");

  const response = await apiClient.get("/posts", {
    params: {
      page,
      limit,
    },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
