export type CommentCreator = {
  _id: string;
  name: string;
  username: string;
  photo: string;
};

export type Comment = {
  _id: string;
  content?: string;
  image?: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  repliesCount: number;
};

export type GetCommentsResponse = {
  success: boolean;
  message: string;
  data: {
    comments: Comment[];
  };
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      numberOfPages: number;
    };
  };
};
