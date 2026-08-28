import type { Post } from "./get-all-posts.response";

export interface LikePostResponse {
  success: boolean;
  message: string;
  data: {
    liked: boolean;
    likesCount: number;
    post: Post;
  };
}
