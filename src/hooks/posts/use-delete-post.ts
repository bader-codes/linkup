import { deletePost } from "@/api/posts/delete-post.api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,

    onSuccess: (_, postId) => {
      queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.filter((post: any) => post._id !== postId),
            },
          })),
        };
      });

      queryClient.setQueriesData(
        { queryKey: ["user-posts"] },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              data: {
                ...page.data,
                posts: page.data.posts.filter(
                  (post: any) => post._id !== postId,
                ),
              },
            })),
          };
        },
      );

      // Remove the deleted post from the single-post cache.
      queryClient.removeQueries({
        queryKey: ["post", postId],
      });
    },
  });
}
