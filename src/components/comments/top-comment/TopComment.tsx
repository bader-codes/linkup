import CommentCard from "@/components/comments/comment-card/CommentCard";
import type { Comment } from "@/types/comments/get-comments.response";

type TopCommentProps = {
  comment: Comment;
};

export default function TopComment({ comment }: TopCommentProps) {
  return <CommentCard comment={comment} />;
}
