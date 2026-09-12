import type { Post } from "@/types/posts/get-all-posts.response";
import CommentForm from "../comments/create-comment/CommentForm";
import TopComment from "../comments/top-comment/TopComment";

import useDeletePost from "@/hooks/posts/use-delete-post";
import { Card, CardHeader } from "@/components/ui/card";
import DeletePostDialog from "./DeletePostDialog";
import { useNavigate } from "react-router-dom";
import PostContent from "../posts/PostContent";
import PostActions from "../posts/PostActions";
import PostHeader from "../posts/PostHeader";
import { useEffect, useState } from "react";
import PostUpdate from "./PostUpdate";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const navigate = useNavigate();

  // Handle delete Post
  const { mutate: deletePost, isPending, isSuccess } = useDeletePost();

  useEffect(() => {
    if (isSuccess) {
      setDeleteDialogOpen(false);
    }
  }, [isSuccess]);

  return (
    <Card className="my-4">
      <PostHeader
        post={post}
        onEdit={() => setIsEditOpen(true)}
        onDelete={() => setDeleteDialogOpen(true)}
      />

      {post.sharedPost ? (
        <Card className="mx-4 rounded-sm px-2">
          <CardHeader>
            <PostHeader post={post.sharedPost} />
            <PostContent post={post.sharedPost} />
          </CardHeader>
        </Card>
      ) : (
        <PostContent post={post} />
      )}

      <PostActions post={post} />

      {post.commentsCount > 1 && (
        <button
          type="button"
          onClick={() => navigate(`/post/${post._id}`)}
          className="ms-5 flex flex-1 cursor-pointer text-gray-600 hover:underline"
        >
          show more comments
        </button>
      )}

      {post.topComment && <TopComment comment={post.topComment} />}

      {post.commentsCount > 0 && <CommentForm post={post} />}

      <PostUpdate post={post} open={isEditOpen} onOpenChange={setIsEditOpen} />

      <DeletePostDialog
        isPending={isPending}
        isSuccess={isSuccess}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => deletePost(post._id)}
      />
    </Card>
  );
}
