import { getSuggestions } from "@/api/suggestions/suggestions.api";
import { useQuery } from "@tanstack/react-query";

export function useSuggestions() {
  return useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
  });
}
