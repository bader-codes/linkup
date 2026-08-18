import InputField from "#components/shared/input-field.tsx";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "#components/ui/button.tsx";
import { MdEmail } from "react-icons/md";

export default function LoginForm() {
  return (
    <form className="space-y-3">
      <div className="grid gap-2 md:grid-cols-1">
        {/* Email */}
        <InputField
          id="email"
          label="Email"
          placeholder="Enter your email"
          icon={MdEmail}
        />

        {/* Password */}
        <InputField
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          icon={RiLockPasswordFill}
        />
      </div>

      <Button type="submit" className="w-full py-5 cursor-pointer">
        Login
      </Button>
    </form>
  );
}
