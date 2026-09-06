import type { ProfileResponse } from "@/types/users/profile-data-response";
import { apiClient } from "../client";

export async function getUserProfile(userId: string) {
  const response = await apiClient.get<ProfileResponse>(
    `/users/${userId}/profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data.data;
}