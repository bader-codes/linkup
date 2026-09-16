import { apiClient } from "../client";

export async function uploadProfilePhoto(file: File) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("photo", file);

  const response = await apiClient.put("/users/upload-photo", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
