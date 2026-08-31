import { commentSchema, type CommentFormValues } from "@/schemas/commentSchema";
import { createComment } from "@/api/comments/create-comment.api";
import type { Post } from "@/types/posts/get-all-posts.response";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { RiSendInsFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { LuCamera } from "react-icons/lu";

interface CommentInputProps {
  post: Post;
}

export default function CommentInput({ post }: CommentInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [expanded, setExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    formState: { isValid },
  } = useForm<CommentFormValues>({
    defaultValues: {
      commentValue: "",
      image: null,
    },
    resolver: zodResolver(commentSchema),
  });

  const image = watch("image")?.[0];

  useEffect(() => {
    if (!image) {
      setPreviewUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  const imageRegister = register("image");

  const commentSubmit = async (data: CommentFormValues) => {
    try {
      const response = await createComment(post._id, {
        content: data.commentValue,
        image: data.image?.[0],
      });

      console.log(response);

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(commentSubmit)} className="w-full px-4 pb-3">
        <div
          className={`relative rounded-3xl bg-gray-200 transition-all duration-300 ${
            expanded ? "rounded-lg" : ""
          }`}
        >
          <Textarea
            {...register("commentValue")}
            placeholder="write a comment..."
            onFocus={() => setExpanded(true)}
            className={`resize-none border-0 bg-transparent shadow-none focus-visible:ring-0
              ${expanded ? "max-h-70 pb-10" : "min-h-10"}
            `}
          />

          <div
            className={`
              pointer-events-none absolute bottom-2 left-3 right-3 flex items-center justify-between
              ${expanded ? "pt-2" : ""}
              `}
          >
            <button
              type="submit"
              disabled={!isValid}
              className={`pointer-events-auto transition-all duration-200 disabled:cursor-not-allowed
                ${expanded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
              `}
            >
              <RiSendInsFill
                className={`size-5 ${isValid ? "text-primary" : ""}`}
              />
            </button>

            {/* Image File Button */}
            <label
              htmlFor={`comment-image-${post._id}`}
              className="pointer-events-auto cursor-pointer"
            >
              <LuCamera className="size-6" />
            </label>

            <input
              {...imageRegister}
              id={`comment-image-${post._id}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                imageRegister.onChange(e);
                setExpanded(true);
              }}
            />
          </div>
        </div>
      </form>

      {/* Image Live preview */}
      {previewUrl && (
        <div className="relative w-fit justify-center px-2 py-2">
          <img
            src={previewUrl}
            alt="Selected image"
            className="size-17 rounded-xl object-cover"
          />

          <button
            type="button"
            onClick={() => resetField("image")}
            className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full cursor-pointer bg-black text-white"
          >
            <IoClose className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
