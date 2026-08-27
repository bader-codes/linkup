import useInfiniteScroll from "@/hooks/shared/use-infinite-scroll";
import useAllPosts from "@/hooks/posts/use-all-posts";
import PostSkeleton from "./PostSkeleton";
import PostCard from "./PostCard";

export default function AllPosts() {
  const {
    isLoading,
    isError,
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllPosts();

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
