import type { Post } from "@/types/posts/get-all-posts.response";
import PostTimestamp from "@/components/shared/PostTimestamp";
import { HiDotsHorizontal } from "react-icons/hi";
import { CardHeader } from "@/components/ui/card";
import { FaBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <CardHeader className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Link to={`/profile/${post.user.username}`}>
          <img
            src={post.user.photo}
            alt={`${post.user.name} photo`}
            className="size-10 rounded-full"
          />
        </Link>

        <div>
          <Link
            to={`/profile/${post.user.username}`}
            className="block text-lg font-semibold hover:underline"
          >
            {post.user.name}
          </Link>

          <PostTimestamp createdAt={post.createdAt} />
        </div>
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full text-sm hover:bg-gray-100 cursor-pointer">
          <HiDotsHorizontal className="size-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex w-40 flex-col items-center px-4 py-1 md:w-45">
          <DropdownMenuItem className="my-2 flex w-full cursor-pointer items-center justify-center gap-2 text-lg hover:bg-blue-500 hover:text-white">
            <span>Save post</span>
            <FaBookmark />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  );
}
