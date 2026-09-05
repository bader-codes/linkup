import { profileData } from "@/api/users/profile-data.api";
import { useQuery } from "@tanstack/react-query";

export default function useProfileData() {
  return useQuery({
    queryKey: ["profile-data"],
    queryFn: profileData,
  });
}