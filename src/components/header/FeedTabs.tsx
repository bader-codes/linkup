import { FaHouse, FaUserGroup } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

type FeedType = "home" | "following";

export default function FeedTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFeed: FeedType =
    searchParams.get("feed") === "following" ? "following" : "home";

  const handleFeedChange = (feed: FeedType) => {
    if (feed === "home") {
      searchParams.delete("feed");
    } else {
      searchParams.set("feed", feed);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="flex w-22 items-center justify-between gap-1 rounded-xl border border-gray-50 bg-muted/10 p-1 shadow-sm sm:w-32 md:w-40">
      <button
        type="button"
        aria-label="Home feed"
        onClick={() => handleFeedChange("home")}
        className={`flex items-center justify-center rounded-lg p-1.5 cursor-pointer transition-all duration-200 sm:p-1.5 md:p-2 ${
          activeFeed === "home"
            ? "bg-blue-600 text-white shadow-md"
            : "text-muted-foreground hover:bg-background hover:text-blue-600"
        }`}
      >
        <FaHouse className="size-5 sm:size-5 md:size-6" />
      </button>

      <button
        type="button"
        aria-label="Following feed"
        onClick={() => handleFeedChange("following")}
        className={`flex items-center justify-center rounded-lg p-1.5 cursor-pointer transition-all duration-200 sm:p-1.5 md:p-2 ${
          activeFeed === "following"
            ? "bg-blue-600 text-white shadow-md"
            : "text-muted-foreground hover:bg-background hover:text-blue-600"
        }`}
      >
        <FaUserGroup className="size-5 sm:size-5 md:size-6" />
      </button>
    </div>
  );
}
