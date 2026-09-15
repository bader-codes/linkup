import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileUser } from "@/types/users/profile-data-response";
import useFollowUser from "@/hooks/users/use-follow-user";
import cover from "../../assets/images/Cover.jpg";
import { FaBirthdayCake } from "react-icons/fa";

type ProfileHeaderProps = {
  user: ProfileUser;
  isFollowing: boolean;
};

export default function ProfileHeader({
  user,
  isFollowing,
}: ProfileHeaderProps) {
  const { mutate: followUser } = useFollowUser();

  // Trigger the follow/unfollow mutation for the current profile user.
  const handleFollowUser = () => {
    followUser(user._id);
  };

  return (
    <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Cover */}
      <div className="h-40 bg-muted sm:h-52">
        <img
          src={user.cover || cover}
          alt={`${user.name} cover`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 sm:px-6">
        {/* Avatar */}
        <div className="-mt-12 sm:-mt-14">
          <Avatar className="size-24 border-4 border-card bg-card shadow-sm sm:size-28">
            <AvatarImage
              src={user.photo}
              alt={user.name}
              className="object-cover"
            />

            <AvatarFallback className="text-xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name, Username & Follow Button */}
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {user.name}
            </h1>

            <p className="mt-0.5 text-sm text-muted-foreground">
              @{user.username}
            </p>
          </div>

          <button
            type="button"
            onClick={handleFollowUser}
            className={`
              cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors
              ${
                isFollowing
                  ? "bg-gray-200 text-black"
                  : "bg-blue-600 text-white hover:bg-blue-600/80"
              }
            `}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-3 flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">{user.followersCount}</span>

            <span className="text-sm text-muted-foreground">Followers</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold">{user.followingCount}</span>

            <span className="text-sm text-muted-foreground">Following</span>
          </div>
        </div>

        {/* Personal Info */}
        <div className="mt-3 flex items-center gap-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Gender</p>

            <p className="mt-1 text-sm font-semibold capitalize">
              {user.gender}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Birthday
            </p>

            <div className="flex items-center gap-2.5">
              <p className="mt-1 text-sm font-semibold">
                {new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <FaBirthdayCake />
            </div>
          </div>
        </div>

        {/* Created At */}
        <div className="mt-3 flex gap-1 text-sm text-muted-foreground">
          <span>Created At -</span>

          <p className="font-semibold text-gray-500">
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
