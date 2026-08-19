import type { LoginFormValues } from "../schemas/loginSchema";
import type { SigninPayload } from "../types/signin/signin-payload";

export const mapLoginFormToPayload = (
  formValues: LoginFormValues,
): SigninPayload => {
  return {
    login: formValues.login,
    password: formValues.password,
  };
};
