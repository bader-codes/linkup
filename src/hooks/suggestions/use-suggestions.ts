import { getSuggestions } from "@/api/users/suggestions.api";
import { useQuery } from "@tanstack/react-query";

export function useSuggestions() {
  return useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
  });
}
