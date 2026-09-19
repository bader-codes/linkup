import CommentCard from "@/components/comments/comment-card/CommentCard";
import type { Comment } from "@/types/comments/get-comments.response";

type TopCommentProps = {
  comment: Comment;
  isReplyOpen?: boolean;
  onReply?: (commentId: string) => void;
};
export default function TopComment({
  comment,
  onReply,
  isReplyOpen,
}: TopCommentProps) {
  return (
    <CommentCard
      comment={comment}
      isReplyOpen={isReplyOpen}
      onReply={(commentId) => {
        onReply?.(commentId);
      }}
    />
  );
}
