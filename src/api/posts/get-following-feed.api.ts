import type { GetAllPostsResponse } from "@/types/posts/get-all-posts.response";
import { apiClient } from "../client";

export async function getFollowingFeedAPI(page: number, limit = 10) {
  const token = localStorage.getItem("token");

  const response = await apiClient.get<GetAllPostsResponse>("/posts/feed", {
    params: {
      only: "following",
      limit,
      page,
    },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
