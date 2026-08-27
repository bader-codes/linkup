import type { SuggestionsResponse } from "@/types/users/suggestions-response";
import { apiClient } from "../client";

export async function getSuggestions() {
  const response = await apiClient.get<SuggestionsResponse>(
    "/users/suggestions",
    {
      params: {
        limit: 9,
      },

      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );

  return response.data;
}
