import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/api/posts/update-post.api";

export default function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,

    onSuccess: (data, variables) => {
      const updatedPost = data.data.post;

      queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((post: any) =>
                post._id === variables.postId
                  ? {
                      ...post,
                      ...updatedPost,
                      user: post.user,
                    }
                  : post,
              ),
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
                posts: page.data.posts.map((post: any) =>
                  post._id === variables.postId
                    ? {
                        ...post,
                        ...updatedPost,
                        user: post.user,
                      }
                    : post,
                ),
              },
            })),
          };
        },
      );

      queryClient.setQueryData(["post", variables.postId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            post: {
              ...oldData.data.post,
              ...updatedPost,
              user: oldData.data.post.user,
            },
          },
        };
      });
    },
  });
}
