import { apiClient } from "../client";

export const followUser = async (userId: string) => {
  const response = await apiClient.put(
    `/users/${userId}/follow`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );

  return response.data;
};
