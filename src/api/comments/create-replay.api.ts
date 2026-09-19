import { apiClient } from "../client";

type CreateReplayData = {
  body?: string;
  image?: File;
};

export const CreateReplay = async (
  postId: string,
  commentId: string,
  data: CreateReplayData,
) => {
  console.log("commentId:", commentId);
  console.log("data:", data);

  const token = localStorage.getItem("token");

  const formData = new FormData();

  if (!data.body && !data.image) {
    throw new Error("Reply must contain body or image");
  }

  if (data.body) {
    formData.append("content", data.body);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await apiClient.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
