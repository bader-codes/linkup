import type { Post } from "@/types/posts/get-all-posts.response";
import { CardContent } from "@/components/ui/card";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <CardContent className="space-y-4">
      <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
        {post.body}
      </p>

      {post.image && (
        <div className="overflow-hidden rounded-xl bg-gray-100">
          <img
            src={post.image}
            alt={`${post.user.name} photo`}
            className="block max-h-100 w-full object-contain"
          />
        </div>
      )}
    </CardContent>
  );
}
