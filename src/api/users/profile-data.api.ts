import { apiClient } from "../client";

export const profileData = async () => {
  const response = await apiClient.get(
    `/users/profile-data`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
};
