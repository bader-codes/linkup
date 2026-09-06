import { getUserProfile } from "@/api/users/get-user-profile.api";
import { useQuery } from "@tanstack/react-query";

export default function useUserProfile(id: string) {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => getUserProfile(id),
  });
}
