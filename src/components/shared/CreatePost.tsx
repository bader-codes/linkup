import useCreatePost from "@/hooks/posts/use-create-post";
import { AuthContext } from "@/context/AuthContext";
import { FaCameraRetro } from "react-icons/fa6";
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreatePost() {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("LoginForm must be used within AuthContextProvider");
  }

  const { user } = authContext;

  const canSubmit = Boolean(body.trim() || image);

  const { mutateAsync, isPending } = useCreatePost();

  const handleCreatePost = async () => {
    if (!body.trim() && !image) return;

    try {
      await mutateAsync({
        body: body.trim(),
        image: image ?? undefined,
      });

      setBody("");
      setImage(null);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          setImage(null);
          setBody("");
        }
      }}
    >
      <div className="w-full mx-auto px-4 py-3 md:py-5 bg-white rounded-md flex items-center gap-3">
        <DialogTrigger className="w-full rounded-xl p-2 md:p-3 bg-[#F0F2F5] text-left text-gray-500 cursor-pointer">
          What's on your mind?
        </DialogTrigger>

        <Link
          to={`/profile`}
          className="h-10 w-10 overflow-hidden rounded-full bg-indigo-400"
        >
          <img
            src={user?.photo || "/avatar.jpg"}
            alt={user?.name || "Profile"}
            className="h-10 w-10 rounded-full object-cover"
          />
        </Link>
      </div>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="border-b-2 pb-5">
          <DialogTitle className="text-center">Create Post</DialogTitle>
        </DialogHeader>

        {/* Overlay */}
        {isPending && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-lg bg-background/70 backdrop-blur-[2px]">
            <Loader2 className="size-8 animate-spin" />
            <span className="mt-3 font-semibold text-lg text-gray-700">
              Creating your post...
            </span>
          </div>
        )}

        {/* Content */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What's on your mind?"
          className="min-h-40 w-full resize-none border-none text-lg outline-none"
        />

        {/* Actions */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <label
                htmlFor="post-image"
                className="cursor-pointer rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300"
              >
                <FaCameraRetro className="size-5 lg:size-6" />
              </label>

              <input
                id="post-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setImage(e.target.files?.[0] ?? null);
                }}
              />
            </div>

            {image && (
              <div className="relative mt-3 h-17 w-17 overflow-hidden rounded-md border">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected image"
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute bg-white right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-black cursor-pointer"
                >
                  <MdClose size={20} />
                </button>
              </div>
            )}
          </div>

          <button
            disabled={!canSubmit || isPending}
            onClick={() => handleCreatePost()}
            className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
