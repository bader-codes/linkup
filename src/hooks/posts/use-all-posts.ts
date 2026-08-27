import type { GetAllPostsResponse } from "@/types/posts/get-all-posts.response";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getAllPostsAPI } from "@/api/posts/get-all-posts.api";
import { queryClient } from "@/lib/queryClient";
import { useEffect } from "react";

const LIMIT = 10;
const REFRESH_INTERVAL = 15_000;

export default function useAllPosts() {
  const query = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getAllPostsAPI(pageParam, LIMIT),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      return lastPage.meta.pagination.nextPage ?? undefined;
    },
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!query.data) return;

      const latestPage = await getAllPostsAPI(1, LIMIT);

      queryClient.setQueryData <InfiniteData<GetAllPostsResponse>>(["posts"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: [latestPage, ...oldData.pages.slice(1)],
        };
      });
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [query.data, queryClient]);

  const posts = query.data?.pages.flatMap((page) => page.data.posts) ?? [];

  return {
    ...query,
    posts,
  };
}
