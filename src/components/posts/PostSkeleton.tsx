import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <Card className="w-[95%] md:w-[85%] lg:w-[65%] mx-auto my-4">
      {/* Header */}
      <CardHeader className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <Skeleton className="size-9 rounded-full" />
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[75%]" />
          <Skeleton className="h-4 w-[50%]" />
        </div>

        <Skeleton className="h-80 w-full rounded-xl" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="w-full flex justify-between bg-white border-none">
        <Skeleton className="h-6 w-10" />
        <Skeleton className="h-6 w-10" />
        <Skeleton className="h-6 w-10" />
      </CardFooter>
    </Card>
  );
}