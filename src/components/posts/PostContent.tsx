import type { Post } from "@/types/posts/get-all-posts.response";
import { CardContent } from "@/components/ui/card";
import { useState } from "react";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const [aspectRatio, setAspectRatio] = useState("4 / 3");

  return (
    <CardContent className="space-y-4">
      <p className="whitespace-pre-wrap text-lg mt-3 leading-6 text-gray-700">
        {post.body}
      </p>

      {post.image && (
        <div
          className="overflow-hidden rounded-xl bg-gray-100"
          style={{ aspectRatio }}
        >
          <img
            src={post.image}
            alt={`${post.user.name} photo`}
            className="block h-full w-full object-contain"
            onLoad={(event) => {
              const image = event.currentTarget;

              setAspectRatio(
                `${image.naturalWidth} / ${image.naturalHeight}`,
              );
            }}
          />
        </div>
      )}
    </CardContent>
  );
}