import type { RegisterFormValues } from "@/schemas/registerSchema";
import type { SignupPayload } from "@/types/signup/signup-payload";

export const mapRegisterFormToPayload = (
  formValues: RegisterFormValues,
): SignupPayload => {
  return {
    name: `${formValues.firstName} ${formValues.lastName}`,
    username: formValues.username,
    email: formValues.email,
    dateOfBirth: [
      formValues.dateOfBirth.year,
      formValues.dateOfBirth.month.padStart(2, "0"),
      formValues.dateOfBirth.day.padStart(2, "0"),
    ].join("-"),
    gender: formValues.gender,
    password: formValues.password,
    rePassword: formValues.rePassword,
  };
};
