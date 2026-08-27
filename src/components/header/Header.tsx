import Notifications from "./Notifications";
import { Link } from "react-router-dom";
import FeedTabs from "./FeedTabs";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-2 py-2 md:px-4">
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
