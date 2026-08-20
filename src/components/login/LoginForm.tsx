import { loginSchema, type LoginFormValues } from "../../schemas/loginSchema";
import { mapLoginFormToPayload } from "../../mappers/login.mapper";
import InputField from "#components/shared/input-field.tsx";
import { AuthContext } from "../../context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "#components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/users.api";
import { useContext, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { MdPerson } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Get Set User Token From Auth Context
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("LoginForm must be used within AuthContextProvider");
  }

  const { setUserToken } = authContext;

  // React Hook Form Implmentation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },

    resolver: zodResolver(loginSchema),
  });

  // Form Submit Function
  const handleLoginSubmit = async (formValues: LoginFormValues) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Prepare payload
      const loginPayload = mapLoginFormToPayload(formValues);

      // Send request
      const response = await signin(loginPayload);

      // Show success message
      toast.success(response.message, {
        autoClose: 1500,
      });

      // Save authentication token
      localStorage.setItem("token", response.data.token);

      // Update authentication state
      setUserToken(localStorage.getItem("token"));

      // Redirect to home
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ??
            "Unable to sign in. Please try again.",
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handleLoginSubmit)}>
      {serverError && (
        <p
          role="alert"
          className="mb-3 rounded-md bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400"
        >
          {serverError}
        </p>
      )}

      <div className="grid gap-2 md:grid-cols-1">
        {/* Email */}
        <InputField
          {...register("login")}
          id="login"
          label="Email or Username"
          placeholder="Enter your email or username"
          icon={MdPerson}
          error={errors.login?.message}
        />

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
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 cursor-pointer"
      >
        {isLoading ? <ImSpinner2 className="animate-spin" /> : "Login"}
      </Button>
    </form>
  );
}
