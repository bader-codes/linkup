import { RiShareForwardFill } from "react-icons/ri";
import { CardFooter } from "@/components/ui/card";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";

export default function PostActions() {
  return (
    <CardFooter className="w-full border-none bg-white px-6 py-3">
      <div className="flex w-full items-center justify-between border-t pt-2">
        <button
          type="button"
          className="group flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600"
        >
          <AiOutlineLike className="size-5 transition-transform group-hover:scale-110" />
          <span className="text-sm font-medium">Like</span>
        </button>

        <button
          type="button"
          className="group flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <GoComment className="size-5 transition-transform group-hover:scale-110" />
          <span className="text-sm font-medium">Comment</span>
        </button>

        <button
          type="button"
          className="group flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <RiShareForwardFill className="size-5 transition-transform group-hover:scale-110" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </CardFooter>
  );
}
