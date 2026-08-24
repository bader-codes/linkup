import { followUser } from "../../../api/suggestions/follow.api";
import { FaCheck, FaPlus } from "react-icons/fa";
import { useState } from "react";

interface FollowButtonProps {
  userId: string;
  onFollowSuccess: () => void;
}

export default function FollowButton({
  userId,
  onFollowSuccess,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  async function handleFollow() {
    try {
      setIsFollowing(true);

      const data = await followUser(userId);

      if (data.success) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        onFollowSuccess();
      }
    } catch (error) {
      console.error(error);
      setIsFollowing(false);
    }
  }

  return (
    <button
      type="button"
      disabled={isFollowing}
      onClick={handleFollow}
      className="shrink-0 cursor-pointer rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 transition disabled:cursor-default disabled:opacity-70 hover:bg-blue-600 hover:text-white"
    >
      {isFollowing ? (
        <div className="flex items-center gap-3">
          <span>Following</span>
          <FaCheck />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span>Follow</span>
          <FaPlus />
        </div>
      )}
    </button>
  );
}
