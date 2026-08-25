import type { SigninResponse } from "@/types/signin/signin-response";
import type { SigninPayload } from "@/types/signin/signin-payload";
import { apiClient } from "../client";

export const signin = async (data: SigninPayload) => {
  const response = await apiClient.post<SigninResponse>("/users/signin", data);

  return response.data;
};