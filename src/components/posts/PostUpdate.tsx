import type { Post } from "@/types/posts/get-all-posts.response";
import { FaCameraRetro } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useUpdatePost from "@/hooks/posts/use-update-post";
import { Loader2 } from "lucide-react";

interface PostUpdateProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PostUpdateForm {
  body: string;
}

export default function PostUpdate({
  post,
  open,
  onOpenChange,
}: PostUpdateProps) {
  const [image, setImage] = useState<string | File | null>(post.image);

  const { register, reset, watch, handleSubmit } = useForm<PostUpdateForm>({
    defaultValues: {
      body: post.body,
    },
  });

  const body = watch("body");

  // Ignore leading and trailing spaces when checking body changes.
  const isBodyChanged = (body ?? "").trim() !== (post.body ?? "").trim();

  // Image is changed when a new image is selected or the old image is removed.
  const isImageChanged = image !== post.image;

  // The post must contain either text or an image.
  const hasContent = Boolean(body?.trim() || image);

  // If the original image was removed, a new image must be selected.
  const imageNeedsReplacement = Boolean(post.image && image === null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset({
        body: post.body,
      });

      setImage(post.image);
    }

    onOpenChange(open);
  };

  const { mutateAsync, isPending } = useUpdatePost();

  const onSubmit = async (data: PostUpdateForm) => {
    try {
      await mutateAsync({
        postId: post._id,
        body: data.body,
        image: image instanceof File ? image : undefined,
      });

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="border-b-2 pb-5">
          <DialogTitle className="text-center">Edit post</DialogTitle>
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
          {...register("body")}
          placeholder="What's on your mind?"
          className="min-h-40 w-full resize-none border-none text-lg outline-none"
        />

        {/* Actions */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <label
                htmlFor={`post-image-${post._id}`}
                className="cursor-pointer rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300"
              >
                <FaCameraRetro className="size-5 lg:size-6" />
              </label>

              <input
                id={`post-image-${post._id}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setImage(file);
                  }
                }}
              />
            </div>
          </div>

          {/* Image Preview */}
          {image && (
            <div className="relative mt-3 h-17 w-17 overflow-hidden rounded-md border">
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="Post image"
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute right-0.5 top-0.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white text-black"
              >
                <MdClose size={20} />
              </button>
            </div>
          )}

          {/* Save */}
          <button
            type="button"
            disabled={
              (!isBodyChanged && !isImageChanged) ||
              !hasContent ||
              imageNeedsReplacement
            }
            className="
              mt-4 w-full cursor-pointer rounded-lg bg-blue-600 py-2.5
              font-semibold text-white hover:bg-blue-700
              disabled:cursor-not-allowed disabled:bg-gray-300
            "
            onClick={handleSubmit(onSubmit)}
          >
            Save changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
