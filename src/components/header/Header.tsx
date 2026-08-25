import Notifications from "./Notifications";
import FeedTabs from "./FeedTabs";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white py-2 px-2 md:px-4">
      {/* Left */}
      <Link
        to="/"
        className="text-xl font-extrabold cursor-pointer tracking-tight text-blue-600 transition-colors sm:text-2xl"
      >
        Linkup
      </Link>

      {/* Center */}
      <FeedTabs />

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex size-9 items-center justify-center sm:size-10 md:size-11">
          <Notifications />
        </div>

        <div className="flex size-9 items-center justify-center sm:size-10 md:size-11">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
