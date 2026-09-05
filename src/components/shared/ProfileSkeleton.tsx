import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <section className="w-full overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Cover */}
      <Skeleton className="h-40 w-full sm:h-52" />

      {/* Profile Info */}
      <div className="px-4 pb-4 sm:px-6">
        {/* Avatar */}
        <div className="-mt-12 sm:-mt-14">
          <Skeleton className="size-24 rounded-full border-4 border-card sm:size-28" />
        </div>

        {/* Name & Username */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-6 w-40 sm:h-7" />
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Stats */}
        <div className="mt-3 flex gap-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Created At */}
        <Skeleton className="mt-3 h-4 w-36" />
      </div>
    </section>
  );
}
