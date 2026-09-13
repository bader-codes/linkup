import CommentForm from "@/components/comments/create-comment/CommentForm";
import type { Post } from "@/types/posts/get-all-posts.response";
import PostActions from "@/components/posts/PostActions";
import PostContent from "@/components/posts/PostContent";
import PostHeader from "@/components/posts/PostHeader";
import { Card } from "@/components/ui/card";
import CommentsList from "./CommentsList";
import { useEffect, useState } from "react";
import useDeletePost from "@/hooks/posts/use-delete-post";
import PostUpdate from "@/components/posts/PostUpdate";
import DeletePostDialog from "@/components/posts/DeletePostDialog";
import { useNavigate } from "react-router-dom";

type PostDetailsContentProps = {
  post: Post;
};

export default function PostDetailsContent({ post }: PostDetailsContentProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const navigate = useNavigate();

  // Handle delete Post
  const { mutate: deletePost, isPending, isSuccess } = useDeletePost();

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  return (
    <Card className="mx-auto my-4 flex h-150 w-full flex-col overflow-hidden ring-0">
      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
        <PostHeader
          post={post}
          onDelete={() => setDeleteDialogOpen(true)}
          onEdit={() => setIsEditOpen(true)}
        />

        <PostContent post={post} />

        <PostActions post={post} />

        <CommentsList postId={post.id} />
      </div>

      <CommentForm post={post} />

      {isEditOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
          <PostUpdate
            post={post}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
        </div>
      )}

      {deleteDialogOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
          <DeletePostDialog
            isPending={isPending}
            isSuccess={isSuccess}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={() => deletePost(post._id)}
          />
        </div>
      )}
    </Card>
  );
}
