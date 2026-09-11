import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts/create-post.api";

export default function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });
    },
  });
}