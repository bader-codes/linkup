export interface GetAllPostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
  };
  meta: {
    pagination: Pagination;
  };
}

export interface Post {
  _id: string;
  body: string;
  image: string | null;
  privacy: string;
  user: PostUser;
  sharedPost: unknown | null;
  likes: unknown[];
  createdAt: string;
  commentsCount: number;
  topComment: unknown | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

export interface PostUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number | null;
  total: number;
}