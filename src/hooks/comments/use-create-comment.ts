import type { GetCommentsResponse } from "@/types/comments/get-comments.response";
import type { GetAllPostsResponse } from "@/types/posts/get-all-posts.response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/api/comments/create-comment.api";
import type { InfiniteData } from "@tanstack/react-query";

type CreateCommentVariables = {
  postId: string;
  content?: string;
  image?: File;
};

export default function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content, image }: CreateCommentVariables) =>
      createComment(postId, {
        content,
        image,
      }),

    onSuccess: (response, variables) => {
      // Update comments cache
      queryClient.setQueryData<InfiniteData<GetCommentsResponse>>(
        ["comments", variables.postId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              if (index !== 0) return page;

              return {
                ...page,
                data: {
                  ...page.data,
                  comments: [
                    response.data.comment,
                    ...page.data.comments,
                  ],
                },
              };
            }),
          };
        },
      );

      // Update posts cache
      queryClient.setQueriesData<InfiniteData<GetAllPostsResponse>>(
        {
          queryKey: ["posts"],
        },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                posts: page.data.posts.map((post) =>
                  post.id === variables.postId
                    ? {
                        ...post,
                        commentsCount: post.commentsCount + 1,
                      }
                    : post,
                ),
              },
            })),
          };
        },
      );
    },
  });
}