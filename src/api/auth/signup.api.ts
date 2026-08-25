import type { SignupResponse } from "@/types/signup/signup-response";
import type { SignupPayload } from "@/types/signup/signup-payload";
import { apiClient } from "../client";

export const signup = async (data: SignupPayload) => {
  const response = await apiClient.post<SignupResponse>("/users/signup", data);

  return response.data;
};