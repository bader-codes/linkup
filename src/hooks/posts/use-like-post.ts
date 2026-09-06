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

// Update a specific post inside an infinite query cache.
function updatePostInCache(
  oldData: InfiniteData<GetAllPostsResponse> | undefined,
  postId: string,
  userId: string,
) {
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

            // Optimistically add or remove the current user's ID.
            likes: isLiked
              ? post.likes.filter((id) => id !== userId)
              : [...post.likes, userId],

            // Optimistically update the likes count.
            likesCount: isLiked
              ? post.likesCount - 1
              : post.likesCount + 1,
          };
        }),
      },
    })),
  };
}

export default function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: LikePostVariables) => likePostAPI(postId),

    onMutate: async ({ postId, userId }) => {
      // Cancel in-flight requests so they don't overwrite the optimistic update.
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["posts"],
        }),
        queryClient.cancelQueries({
          queryKey: ["user-posts"],
        }),
      ]);

      // Save the current cache so we can restore it if the request fails.
      const previousPosts = queryClient.getQueriesData<
        InfiniteData<GetAllPostsResponse>
      >({
        queryKey: ["posts"],
      });

      const previousUserPosts = queryClient.getQueriesData<
        InfiniteData<GetAllPostsResponse>
      >({
        queryKey: ["user-posts"],
      });

      // Update Home / Following posts cache.
      queryClient.setQueriesData<InfiniteData<GetAllPostsResponse>>(
        {
          queryKey: ["posts"],
        },
        (oldData) => updatePostInCache(oldData, postId, userId),
      );

      // Update MyProfile / UserProfile posts cache.
      queryClient.setQueriesData<InfiniteData<GetAllPostsResponse>>(
        {
          queryKey: ["user-posts"],
        },
        (oldData) => updatePostInCache(oldData, postId, userId),
      );

      return {
        previousPosts,
        previousUserPosts,
      };
    },

    onError: (_error, _variables, context) => {
      if (!context) return;

      // Restore Home / Following cache if the request fails.
      context.previousPosts.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      // Restore Profile posts cache if the request fails.
      context.previousUserPosts.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      // Refetch both post lists to make sure the optimistic state
      // matches the actual server state.
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });
    },
  });
}