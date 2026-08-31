import type { Post } from "@/types/posts/get-all-posts.response";
import CommentForm from "../comments/create-comment/CommentForm";
import { Card } from "@/components/ui/card";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="mx-auto my-4 w-[95%] md:w-[85%] lg:w-[65%]">
      <PostHeader post={post} />

      <PostContent post={post} />

      <PostActions post={post} />

      <CommentForm post={post} />
    </Card>
  );
}
