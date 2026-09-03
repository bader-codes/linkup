import { Skeleton } from "../ui/skeleton";

export default function CommentSkeleton() {
  return (
    <div className="flex items-start gap-3 py-3">
      <Skeleton className="size-10 shrink-0 rounded-full" />

      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
