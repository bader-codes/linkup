import useInfiniteScroll from "@/hooks/shared/use-infinite-scroll";
import useAllPosts from "@/hooks/posts/use-all-posts";
import { useSearchParams } from "react-router-dom";
import PostSkeleton from "../shared/PostSkeleton";
import PostCard from "./PostCard";

export default function AllPosts() {
  const [searchParams] = useSearchParams();

  const feed = searchParams.get("feed") === "following" ? "following" : "home";

  const {
    isLoading,
    isError,
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllPosts(feed);

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="my-2">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      <div ref={sentinelRef} className="h-10">
        {isFetchingNextPage && <PostSkeleton />}
      </div>
    </div>
  );
}
