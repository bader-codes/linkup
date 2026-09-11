import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileUser } from "@/types/users/profile-data-response";
import cover from "../../assets/images/Cover.jpg";
import { FaBirthdayCake } from "react-icons/fa";

type ProfileHeaderProps = {
  user: ProfileUser;
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Cover */}
      <div className="h-40 bg-muted sm:h-52">
        <img
          src={cover}
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

        {/* Name & Username */}
        <div className="mt-3">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            {user.name}
          </h1>

          <p className="mt-0.5 text-sm text-muted-foreground">
            @{user.username}
          </p>
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

        {/* Craeted At */}
        <div className="flex mt-3 gap-1 text-sm text-muted-foreground">
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
