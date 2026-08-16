import InputField from "#components/shared/input-field.tsx";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "#components/ui/button.tsx";
import GenderSelect from "./GenderSelect";
import { MdEmail } from "react-icons/md";
import DateOfBirth from "./DateOfBirth";
import { FaUser } from "react-icons/fa";


export default function RegisterForm() {
  return (
    <form className="space-y-2">
      <div className="grid gap-2 md:grid-cols-1">
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-5">
          {/* First Name */}
          <InputField
            id="f-name"
            label="First Name"
            placeholder="Enter your first name"
            icon={FaUser}
          />

          {/* Last Name */}
          <InputField
            id="l-name"
            label="Last Name"
            placeholder="Enter your last name"
            icon={FaUser}
          />
        </div>

        {/* User Name */}
        <InputField
          id="user-name"
          label="User Name"
          placeholder="Enter your username"
          icon={FaUser}
        />

        {/* Email */}
        <InputField
          id="email"
          label="Email"
          placeholder="Enter your email"
          icon={MdEmail}
        />

        {/* Date of Birth */}
        <DateOfBirth />

        {/* Gender */}
        <GenderSelect />

        {/* Password */}
        <InputField
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          icon={RiLockPasswordFill}
        />

        {/* Confirm Password */}
        <InputField
          id="confirm-password"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          icon={RiLockPasswordFill}
        />
      </div>

      <Button type="submit" className="w-full py-5 cursor-pointer">
        Create Account
      </Button>
    </form>
  );
}
