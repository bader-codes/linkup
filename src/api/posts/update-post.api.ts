import { apiClient } from "../client";

interface UpdatePostData {
  postId: string;
  body: string;
  image?: File | null;
}

export const updatePost = async ({
  postId,
  body,
  image,
}: UpdatePostData) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  if (body.trim()) {
    formData.append("body", body.trim());
  }

  if (image instanceof File) {
    formData.append("image", image);
  }

  if (image === null) {
    formData.append("image", "");
  }

  const response = await apiClient.put(`posts/${postId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};