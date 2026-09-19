import { CreateReplay } from "@/api/comments/create-replay.api";
import { useMutation } from "@tanstack/react-query";

type CreateReplyVariables = {
  postId: string;
  commentId: string;
  data: {
    body?: string;
    image?: File;
  };
};

export default function useCreateReply() {
  return useMutation({
    mutationFn: ({ postId, commentId, data }: CreateReplyVariables) =>
      CreateReplay(postId, commentId, data),
  });
}
