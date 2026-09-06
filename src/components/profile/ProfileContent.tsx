import useProfileData from "@/hooks/users/use-profile-data";
import ProfileSkeleton from "../shared/ProfileSkeleton";
import PostSkeleton from "../posts/PostSkeleton";
import CreatePost from "../shared/CreatePost";
import ProfileHeader from "./ProfileHeader";
import UserPosts from "../posts/UserPosts";

export default function ProfileContent() {
  const { data, isLoading, isError } = useProfileData();

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <ProfileSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  const user = data.data.user;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <ProfileHeader user={user} />
      <CreatePost />
      <UserPosts userId={user._id}/>
    </div>
  );
}
