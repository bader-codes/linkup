import type { Post } from "@/types/posts/get-all-posts.response";
import { CardContent } from "@/components/ui/card";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <CardContent className="space-y-4">
      <p className="mt-3 text-lg leading-6 whitespace-pre-wrap text-gray-700">
        {post.body}
      </p>

      {post.image && (
        <div className="flex justify-center overflow-hidden rounded-xl bg-gray-100">
          <img
            src={post.image}
            alt={`${post.user.name} photo`}
            className="block max-h-125 max-w-full object-contain"
          />
        </div>
      )}
    </CardContent>
  );
}