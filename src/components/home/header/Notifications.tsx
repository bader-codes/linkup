import { FaBell } from "react-icons/fa6";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#components/ui/popover.tsx";
import { ImCheckmark } from "react-icons/im";

type Notification = {
  id: number;
  name: string;
  message: string;
  time: string;
  isRead: boolean;
};

const notifications: Notification[] = [
  {
    id: 1,
    name: "Ahmed",
    message: "liked your post.",
    time: "2 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    name: "Sara",
    message: "started following you.",
    time: "15 minutes ago",
    isRead: true,
  },
];

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter((notification) => !notification.isRead);

  return (
    <Popover>
      {/* Notification Button */}
      <PopoverTrigger
        type="button"
        aria-label="Notifications"
        className="relative flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted sm:size-10 md:size-11"
      >
        <FaBell className="size-6 md:size-7 lg:size-7.5 cursor-pointer" />

        {/* Unread indicator */}
        <span className="absolute right-1 top-1 size-2 rounded-full bg-blue-600 ring-2 ring-background" />
      </PopoverTrigger>

      {/* Notifications Box */}
      <PopoverContent
        align="center"
        sideOffset={12}
        className="w-70 p-0 sm:w-96"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold">Notifications</h3>

          <button
            type="button"
            className="text-sm text-muted-foreground transition-colors hover:text-blue-600"
          >
            <ImCheckmark size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex border-b px-2">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`flex-1 border-b-2 px-3 py-2 text-sm font-medium transition-colors
              ${
                activeFilter === "all"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-muted-foreground hover:text-blue-600"
              }
            `}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("unread")}
            className={`flex-1 border-b-2 px-3 py-2 text-sm font-medium transition-colors
              ${
                activeFilter === "unread"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-muted-foreground hover:text-blue-600"
              }
            `}
          >
            Unread
          </button>
        </div>

        {/* Notifications */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex gap-3 border-b p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaBell />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{notification.name}</span>{" "}
                  {notification.message}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>

              {!notification.isRead && (
                <span className="mt-1 size-2 shrink-0 rounded-full bg-blue-600" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
