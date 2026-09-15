import type { UserProfileCache } from "@/types/users/profile-data-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/api/users/follow.api";

export default function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followUser(userId),

    onMutate: async (userId) => {
      await queryClient.cancelQueries({
        queryKey: ["user-profile", userId],
      });

      // Save the current cache so we can restore it if the request fails.
      const oldData = queryClient.getQueryData<UserProfileCache>([
        "user-profile",
        userId,
      ]);

      // Optimistically update the UI before the API request finishes.
      queryClient.setQueryData<UserProfileCache>(
        ["user-profile", userId],
        (currentData) => {
          if (!currentData) return currentData;

          return {
            ...currentData,
            isFollowing: !currentData.isFollowing,
            user: {
              ...currentData.user,
              followersCount: currentData.isFollowing
                ? currentData.user.followersCount - 1
                : currentData.user.followersCount + 1,
            },
          };
        },
      );

      return { oldData };
    },

    onError: (_error, userId, context) => {
      // Roll back the optimistic update if the API request fails.
      queryClient.setQueryData<UserProfileCache>(
        ["user-profile", userId],
        context?.oldData,
      );
    },
  });
}