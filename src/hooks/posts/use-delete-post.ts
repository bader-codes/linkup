import { deletePost } from "@/api/posts/delete-post.api";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,

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
