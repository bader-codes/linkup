import { useState } from "react";
import { FaHouse, FaUserGroup } from "react-icons/fa6";

type FeedType = "home" | "following";

export default function FeedTabs() {
  const [activeFeed, setActiveFeed] = useState<FeedType>("home");

  return (
    <div className="flex w-22 items-center justify-between gap-1 rounded-xl border border-gray-50 bg-muted/10 p-1 shadow-sm sm:w-32 md:w-40">
      {/* Home */}
      <button
        type="button"
        aria-label="Home feed"
        onClick={() => setActiveFeed("home")}
        className={`flex items-center justify-center rounded-lg ransition-all duration-200 p-1.5 sm:p-1.5 md:p-2
          ${
            activeFeed === "home"
              ? "bg-blue-600 text-white shadow-md"
              : "text-muted-foreground hover:bg-background hover:text-blue-600"
          }
        `}
      >
        <FaHouse className="size-5 sm:size-5 md:size-6" />
      </button>

      {/* Following */}
      <button
        type="button"
        aria-label="Following feed"
        onClick={() => setActiveFeed("following")}
        className={`flex items-center justify-center rounded-lg transition-all duration-200 p-1.5 sm:p-1.5 md:p-2
          ${
            activeFeed === "following"
              ? "bg-blue-600 text-white shadow-md"
              : "text-muted-foreground hover:bg-background hover:text-blue-600"
          }
        `}
      >
        <FaUserGroup className="size-5 sm:size-5 md:size-6" />
      </button>
    </div>
  );
}
