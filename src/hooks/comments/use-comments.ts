import { getCommentsAPI } from "@/api/comments/get-post-comments.api";
import { useInfiniteQuery } from "@tanstack/react-query";


const LIMIT = 10;

export default function useComments(postId: string) {
  return useInfiniteQuery({
    queryKey: ["comments", postId],

    queryFn: ({ pageParam }) => {
      return getCommentsAPI(postId, pageParam, LIMIT);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { currentPage, numberOfPages } = lastPage.meta.pagination;

      return currentPage < numberOfPages ? currentPage + 1 : undefined;
    },
  });
}
