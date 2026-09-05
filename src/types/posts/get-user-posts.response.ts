import type { Pagination, Post } from "../posts/get-all-posts.response";

export interface GetUserPostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
  };
  meta: {
    pagination: Pagination;
  };
}
