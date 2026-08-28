import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { FaBookmark, FaUser } from "react-icons/fa";
import { useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export default function UserMenu() {
  const navigate = useNavigate();

  // Get Set User Token From Auth Context
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("LoginForm must be used within AuthContextProvider");
  }

  const { setUserToken, setUser, user } = authContext;

  function handleLogout() {
    // Remove token from local storage
    localStorage.removeItem("token");
    setUserToken(null);

    // Remove user from local storage
    localStorage.removeItem("user");
    setUser(null);

    navigate("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="cursor-pointer rounded-full outline-none border border-blue-500"
        aria-label="Open user menu"
      >
        <Avatar className="size-8 md:size-9 lg:size-10">
          <AvatarImage
            src={user?.photo || "/avatar.jpg"}
            alt={user?.name || "Profile"}
          />

          <AvatarFallback>BM</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-50" sideOffset={12}>
        <DropdownMenuItem className="text-lg cursor-pointer">
          <FaUser className="size-4 md:size-5 shrink-0" />
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-lg cursor-pointer">
          <FaBookmark className="size-4 md:size-5 shrink-0" />
          <span>Saved</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-lg cursor-pointer">
          <FaGear className="size-4 md:size-5 shrink-0" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-lg cursor-pointer text-red-400"
          onClick={handleLogout}
        >
          <FaArrowRightFromBracket className="size-4 md:size-5 shrink-0" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
