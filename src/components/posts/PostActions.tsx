import type { Post } from "@/types/posts/get-all-posts.response";
import useLikePost from "@/hooks/posts/use-like-post";
import { RiShareForwardFill } from "react-icons/ri";
import { AuthContext } from "@/context/AuthContext";
import { CardFooter } from "@/components/ui/card";
import { BiSolidLike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { useContext } from "react";

interface PostActionsProps {
  post: Post;
  
  // Optional because PostActions is also rendered inside DescComment
  // where the Comment action doesn't need to open another dialog.
  onCommentClick?: () => void;
}

export default function PostActions({
  post,
  onCommentClick,
}: PostActionsProps) {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const { mutate: likePost } = useLikePost();

  const liked = user ? post.likes.includes(user._id) : false;
  const likesCount = post.likesCount;

  const handleLike = () => {
    if (!user) return;

    likePost({
      postId: post._id,
      userId: user._id,
    });
  };

  return (
    <CardFooter className="w-full border-none bg-white px-6 p-0!">
      <div className="grid w-full grid-cols-3 py-2 px-4">
        {/* Like */}
        <div className="flex items-center justify-start">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLike}
              className="group flex cursor-pointer items-center justify-center rounded-md py-2 text-gray-500 transition-colors hover:text-blue-600"
            >
              <BiSolidLike
                className={`size-5 transition-transform group-hover:scale-110 ${
                  liked ? "fill-blue-600 text-blue-600" : ""
                }`}
              />
            </button>

            <span className="text-sm font-medium">
              {likesCount > 0 ? likesCount : ""}
            </span>
          </div>
        </div>

        {/* Comment */}
        <button
          type="button"
          onClick={onCommentClick}
          className="cursor-pointer"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <GoComment className="size-5 transition-transform group-hover:scale-110" />

              <span className="text-sm font-medium">Comment</span>
            </div>

            <span className="text-sm font-medium">
              {post.commentsCount > 0 ? post.commentsCount : ""}
            </span>
          </div>
        </button>

        {/* Share */}
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="group flex cursor-pointer items-center justify-center rounded-lg py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600"
            >
              <RiShareForwardFill className="size-5 transition-transform group-hover:scale-110" />
            </button>

            <span className="text-sm font-medium">Share</span>
          </div>
        </div>
      </div>
    </CardFooter>
  );
}
