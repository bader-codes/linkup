import UserProfileHeader from "@/components/user-profile/UserProfileHeader";
import ProfileSkeleton from "@/components/shared/ProfileSkeleton";
import useUserProfile from "@/hooks/users/use-user-profile";
import PostSkeleton from "@/components/posts/PostSkeleton";
import UserPosts from "@/components/posts/UserPosts";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  // Get the user ID from the URL to load their profile and posts.
  const { userId } = useParams<{ userId: string }>();

  // Prevent rendering if the URL does not contain a valid user ID.
  if (!userId) {
    return null;
  }

  const { data, isLoading, error } = useUserProfile(userId!);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <ProfileSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>User not found</div>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <UserProfileHeader isFollowing={data.isFollowing} user={data.user} />
      <UserPosts userId={userId} />
    </div>
  );
}
