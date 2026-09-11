import type { GetAllPostsResponse } from "@/types/posts/get-all-posts.response";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getFollowingFeedAPI } from "@/api/posts/get-following-feed.api";
import { getAllPostsAPI } from "@/api/posts/get-all-posts.api";
import { queryClient } from "@/lib/queryClient";
import { useEffect } from "react";

export type FeedType = "home" | "following";

export const POSTS_QUERY_KEY = ["posts"];

const LIMIT = 10;

export default function useAllPosts(feed: FeedType) {
  const queryKey = [...POSTS_QUERY_KEY, feed];

  const query = useInfiniteQuery({
    queryKey,

    queryFn: ({ pageParam }) => {
      // Use the appropriate feed endpoint based on the selected feed
      if (feed === "following") {
        return getFollowingFeedAPI(pageParam, LIMIT);
      }

      return getAllPostsAPI(pageParam, LIMIT);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      return lastPage.meta.pagination.nextPage ?? undefined;
    },
  });

useEffect(() => {
  window.scrollTo(0, 0);

  const refreshFirstPage = async () => {
    const latestPage =
      feed === "following"
        ? await getFollowingFeedAPI(1, LIMIT)
        : await getAllPostsAPI(1, LIMIT);

    queryClient.setQueryData<InfiniteData<GetAllPostsResponse>>(
      queryKey,
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: [latestPage, ...oldData.pages.slice(1)],
        };
      },
    );
  };

  refreshFirstPage();
}, [feed]);

  const posts = query.data?.pages.flatMap((page) => page.data.posts) ?? [];

  return {
    ...query,
    posts,
  };
}
