import type { Post } from "./post";

export type AllPostsResponse = {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
  };
  meta: {
    pagination: {
      currentPage: number;
      numberOfPages: number;
      limit: number;
      nextPage: number | null;
      total: number;
    };
  };
};