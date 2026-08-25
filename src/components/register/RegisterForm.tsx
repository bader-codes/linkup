import { mapRegisterFormToPayload } from "@/mappers/register.mapper";
import InputField from "@/components/shared/input-field.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "@/components/ui/button.tsx";
import { signup } from "@/api/auth/signup.api";
import { ImSpinner2 } from "react-icons/im";
import GenderSelect from "./GenderSelect";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import DateOfBirth from "./DateOfBirth";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/schemas/registerSchema";

import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleRegisterSubmit = async (formValues: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Prepare payload
      const registerPayload = mapRegisterFormToPayload(formValues);

      // Send request
      const response = await signup(registerPayload);

      // Show success message
      toast.success(response.message, {
        autoClose: 1500,
      });

      // Save authentication token
      localStorage.setItem("token", response.data.token);

      // Redirect to home
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong", {
          autoClose: 1500,
        });
      } else {
        toast.error("Something went wrong", {
          autoClose: 1500,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(handleRegisterSubmit)}>
      <div className="grid gap-2 md:grid-cols-1">
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-5">
          {/* First Name */}
          <InputField
            {...register("firstName")}
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
        <DateOfBirth control={control} error={errors.dateOfBirth?.message} />

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

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 cursor-pointer"
      >
        {isLoading ? <ImSpinner2 className="animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );
}
