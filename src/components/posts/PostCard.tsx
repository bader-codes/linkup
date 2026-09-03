import type { Comment } from "@/types/comments/get-comments.response";
import type { Post } from "@/types/posts/get-all-posts.response";

import CommentForm from "../comments/create-comment/CommentForm";
import CommentCard from "../comments/comment-card/CommentCard";
import DescComment from "../comments/PostComments/PostComments";
import TopComment from "../comments/top-comment/TopComment";

import { Dialog, DialogContent } from "../ui/dialog";
import { Card } from "@/components/ui/card";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [newComment, setNewComment] = useState<Comment | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <Card className="mx-auto my-4 w-[95%] overflow-y-auto md:w-[85%] lg:w-[65%]">
      <PostHeader post={post} />

      <PostContent post={post} />

      <PostActions post={post} onCommentClick={() => setCommentsOpen(true)} />

      {post.commentsCount > 0 && (
        <button
          type="button"
          onClick={() => setCommentsOpen(true)}
          className="ms-5 flex flex-1 cursor-pointer text-gray-600 hover:underline"
        >
          show more comments
        </button>
      )}

      <Dialog open={commentsOpen} onOpenChange={setCommentsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DescComment post={post} />
        </DialogContent>
      </Dialog>

      {post.topComment && <TopComment comment={post.topComment} />}

      {newComment && <CommentCard comment={newComment} />}

      {post.commentsCount > 0 && (
        <CommentForm
          post={post}
          onCommentCreated={(comment) => setNewComment(comment)}
        />
      )}
    </Card>
  );
}
