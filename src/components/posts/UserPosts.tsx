import useInfiniteScroll from "@/hooks/shared/use-infinite-scroll";
import PostSkeleton from "@/components/posts/PostSkeleton";
import useUserPosts from "@/hooks/users/use-user-posts";
import PostCard from "./PostCard";

type UserPostsProps = {
  userId: string;
};

export default function UserPosts({ userId }: UserPostsProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserPosts(userId);

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

  const posts = data?.pages.flatMap((page) => page.data.posts) ?? [];

  if (posts.length === 0) {
    return <div>No posts yet.</div>;
  }

  return (
    <div className="my-2">
      {posts.map((post) => (
        <div key={post._id} className="mx-auto w-full">
          <PostCard post={post} />
        </div>
      ))}

      <div ref={sentinelRef} className="h-10">
        {isFetchingNextPage && <PostSkeleton />}
      </div>
    </div>
  );
}