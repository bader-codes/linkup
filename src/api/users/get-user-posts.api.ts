import { apiClient } from "../client";

export async function getUserPosts(
  userId: string,
  page: number,
  limit: number,
) {
  const response = await apiClient.get(`/users/${userId}/posts`, {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
}