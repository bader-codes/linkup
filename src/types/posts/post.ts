export type PostUser = {
  _id: string;
  name: string;
  username: string;
  photo: string;
};

export type Post = {
  _id: string;
  id: string;
  body: string;
  image: string | null;
  privacy: string;
  user: PostUser;
  sharedPost: Post | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: unknown | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  bookmarked: boolean;
};