import type { Comment } from "@/types/comments/get-comments.response";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PostTimestamp from "@/components/shared/PostTimestamp";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiSolidLike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TopCommentProps = {
  comment: Comment;
};

export default function CommentCard({ comment }: TopCommentProps) {
  return (
    <Card className="mx-4 rounded-lg border-0 bg-gray-50 py-2 shadow-none ring-0 gap-1">
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 py-2">
        <div className="flex min-w-0 items-start gap-3">
          <Link
            to={`/profile/${comment.commentCreator.username}`}
            className="shrink-0"
          >
            <img
              src={comment.commentCreator.photo}
              alt={`${comment.commentCreator.name} photo`}
              className="size-10 rounded-full object-cover"
            />
          </Link>

          <div className="min-w-0">
            <Link
              to={`/profile/${comment.commentCreator.username}`}
              className="block truncate text-sm font-semibold text-gray-900 hover:underline"
            >
              {comment.commentCreator.name}
            </Link>

            <PostTimestamp createdAt={comment.createdAt} />
          </div>
        </div>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200">
            <HiDotsHorizontal className="size-5" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            <DropdownMenuItem className="my-1 flex cursor-pointer items-center justify-center gap-2 text-red-500 focus:bg-red-500 focus:text-white">
              <span>Delete</span>
              <MdDelete />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="px-4 pb-2 pt-0">
        <div className="ml-13">
          {comment.content && (
            <p className="wrap-break-word text-sm mb-3 leading-6 text-gray-800">
              {comment.content}
            </p>
          )}

          {comment.image && (
            <img
              src={comment.image}
              alt="Comment attachment"
              className="mt-3 max-h-60 max-w-full rounded-lg mb-3 object-cover"
            />
          )}

          {comment.repliesCount > 0 && (
            <button
              type="button"
              className="mt-2 cursor-pointer text-sm font-medium text-blue-600 hover:underline"
            >
              Show {comment.repliesCount} replies
            </button>
          )}

          <div className="mt-1 flex items-center gap-4">
            <button
              type="button"
              className="cursor-pointer text-xs font-semibold text-gray-500 transition-colors hover:text-blue-600"
            >
              Reply
            </button>

            <button
              type="button"
              className="group flex cursor-pointer items-center gap-1.5 text-gray-500 transition-colors hover:text-blue-600"
            >
              <BiSolidLike className="size-4 transition-transform group-hover:scale-110" />
              <span className="text-xs font-semibold">Like</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
