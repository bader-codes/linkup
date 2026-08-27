import type { SigninResponse } from "@/types/auth/signin-response";
import type { SigninPayload } from "@/types/auth/signin-payload";
import { apiClient } from "../client";

export const signin = async (data: SigninPayload) => {
  const response = await apiClient.post<SigninResponse>("/users/signin", data);

  return response.data;
};
