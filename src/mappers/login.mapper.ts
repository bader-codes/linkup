import type { SigninPayload } from "@/types/auth/signin-payload";
import type { LoginFormValues } from "@/schemas/loginSchema";

export const mapLoginFormToPayload = (
  formValues: LoginFormValues,
): SigninPayload => {
  return {
    login: formValues.login,
    password: formValues.password,
  };
};
