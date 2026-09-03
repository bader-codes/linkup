import type { GetAllPostsResponse } from "@/types/posts/get-all-posts.response";
import { likePostAPI } from "@/api/posts/like-post.api";

import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

interface LikePostVariables {
  postId: string;
  userId: string;
}

export default function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: LikePostVariables) => likePostAPI(postId),

    onMutate: async ({ postId, userId }) => {
      // Prevent in-flight requests from overwriting the optimistic update
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<GetAllPostsResponse>
      >({
        queryKey: ["posts"],
      });

      // Update all cached post lists immediately before the API request completes
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
                posts: page.data.posts.map((post) => {
                  if (post._id !== postId) return post;

                  const isLiked = post.likes.includes(userId);

                  return {
                    ...post,
                    likes: isLiked
                      ? post.likes.filter((id) => id !== userId)
                      : [...post.likes, userId],

                    likesCount: isLiked
                      ? post.likesCount - 1
                      : post.likesCount + 1,
                  };
                }),
              },
            })),
          };
        },
      );

      return {
        previousQueries,
      };
    },

    onError: (_error, _variables, context) => {
      if (!context) return;

      // Restore the previous cache state if the like request fails
      context.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
