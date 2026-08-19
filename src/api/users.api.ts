import type { SignupResponse } from "../types/signup/signup-response";
import type { SigninResponse } from "../types/signin/signin-response";
import type { SignupPayload } from "../types/signup/signup-payload";
import type { SigninPayload } from "../types/signin/signin-payload";
import { apiClient } from "./client";

export const signup = async (data: SignupPayload) => {
  const response = await apiClient.post<SignupResponse>("/users/signup", data);

  return response.data;
};

export const signin = async (data: SigninPayload) => {
  const response = await apiClient.post<SigninResponse>("/users/signin", data);

  return response.data;
};
