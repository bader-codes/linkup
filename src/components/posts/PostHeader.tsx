import type { Post } from "@/types/posts/get-all-posts.response";
import PostTimestamp from "@/components/shared/PostTimestamp";
import { AuthContext } from "@/context/AuthContext";
import { HiDotsHorizontal } from "react-icons/hi";
import { CardHeader } from "@/components/ui/card";
import { AiFillDelete } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VscVerifiedFilled } from "react-icons/vsc";

interface PostHeaderProps {
  post: Post;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PostHeader({
  post,
  onEdit,
  onDelete,
}: PostHeaderProps) {
  // Get User Data From Auth Context To Redirect My Profile
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("PostCard must be used within AuthContextProvider");
  }

  const { user } = authContext;

  // Redirect the post author to their own profile,
  // otherwise open the author's public profile.
  const profilePath =
    post.user._id === user?._id ? "/profile" : `/users/${post.user._id}`;

  return (
    <CardHeader className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Link to={profilePath}>
          <img
            src={post.user.photo}
            alt={`${post.user.name} photo`}
            className="size-10 rounded-full"
          />
        </Link>

        <div>
          <div className="flex items-center gap-1.5">
            <Link
              to={profilePath}
              className="block text-lg font-semibold hover:underline"
            >
              {post.user.name}
            </Link>

            {post.user._id === "6a84532b8ebe92c2c0424aa6" && (
              <div className="relative group">
                <VscVerifiedFilled className="size-4.5 cursor-pointer text-blue-500" />

                <span
                  className={`
                      w-fit absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2
                      whitespace-nowrap rounded-sm bg-gray-700 px-3 py-1.5 text-sm
                      text-white group-hover:block font-medium
                    `}
                >
                  The most important person at Linkup
                </span>
              </div>
            )}
          </div>

          <PostTimestamp createdAt={post.createdAt} />
        </div>
      </div>

      {/* Post actions */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full text-sm hover:bg-gray-100 cursor-pointer">
          <HiDotsHorizontal className="size-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex w-50 flex-col items-center px-1 py-2 md:w-50">
          <DropdownMenuItem className="py-2 px-2 my-1 flex w-full cursor-pointer rounded-sm items-center gap-4 text-sm hover:bg-blue-500 hover:text-white">
            <span>Save</span>
            <FaBookmark style={{ width: "17px", height: "17px" }} />
          </DropdownMenuItem>

          {/* Current User Actions */}
          {user?._id === post.user._id && (
            <div className="w-full">
              <DropdownMenuSeparator className="border w-full border-gray-300" />

              <DropdownMenuItem
                onClick={onEdit}
                className="py-2 px-2 my-1 flex w-full cursor-pointer rounded-sm items-center gap-4 text-sm hover:bg-blue-500 hover:text-white"
              >
                <span>Edit post</span>
                <FaEdit style={{ width: "17px", height: "17px" }} />
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onDelete}
                className="py-2 px-2 my-1 flex w-full cursor-pointer rounded-sm items-center gap-3 text-sm hover:bg-blue-500 hover:text-white"
              >
                <span>Delete post</span>

                <AiFillDelete style={{ width: "21px", height: "21px" }} />
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  );
}
