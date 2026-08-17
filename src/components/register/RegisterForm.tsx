import InputField from "#components/shared/input-field.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "#components/ui/button.tsx";
import GenderSelect from "./GenderSelect";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import DateOfBirth from "./DateOfBirth";
import { FaUser } from "react-icons/fa";
import {
  registerSchema,
  type RegisterFormValues,
} from "#components/schemas/registerSchema.ts";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
      gender: "",
      password: "",
      rePassword: "",
    },

    resolver: zodResolver(registerSchema),
  });

  const handleRegisterSubmit = (formValues: RegisterFormValues) => {
    const registerPayload = {
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

    console.log(registerPayload);
    
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(handleRegisterSubmit)}>
      <div className="grid gap-2 md:grid-cols-1">
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-5">
          {/* First Name */}
          <InputField
            {...register("firstName", {
              required: { value: true, message: "email is requeird" },
            })}
            id="f-name"
            label="First Name"
            placeholder="Enter your first name"
            icon={FaUser}
            error={errors.firstName?.message}
          />

          {/* Last Name */}
          <InputField
            {...register("lastName")}
            id="l-name"
            label="Last Name"
            placeholder="Enter your last name"
            icon={FaUser}
            error={errors.lastName?.message}
          />
        </div>

        {/* User Name */}
        <InputField
          {...register("username")}
          id="user-name"
          label="User Name"
          placeholder="Enter your username"
          icon={FaUser}
          error={errors.username?.message}
        />

        {/* Email */}
        <InputField
          {...register("email")}
          id="email"
          label="Email"
          placeholder="Enter your email"
          icon={MdEmail}
          error={errors.email?.message}
        />

        {/* Date of Birth */}
        <DateOfBirth control={control} error={errors.dateOfBirth?.message}/>

        {/* Gender */}
        <GenderSelect control={control} error={errors.gender?.message} />

        {/* Password */}
        <InputField
          {...register("password")}
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          icon={RiLockPasswordFill}
          error={errors.password?.message}
        />

        {/* Confirm Password */}
        <InputField
          {...register("rePassword")}
          id="confirm-password"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          icon={RiLockPasswordFill}
          error={errors.rePassword?.message}
        />
      </div>

      <Button type="submit" className="w-full py-5 cursor-pointer">
        Create Account
      </Button>
    </form>
  );
}
