import type { Comment } from "@/types/comments/get-comments.response";
import useCreateReply from "@/hooks/comments/use-create-reply";
import { Textarea } from "@/components/ui/textarea";
import { RiSendInsFill } from "react-icons/ri";
import { LuCamera } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";

type ReplyFormProps = {
  comment: Comment;
};

type ReplyFormValues = {
  body: string;
  image: FileList | null;
};

export default function ReplyForm({ comment }: ReplyFormProps) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ReplyFormValues>({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  const { mutateAsync: createReply, isPending } = useCreateReply();

  // Handle Preview Image
  const image = watch("image");

  const previewUrl =
    image && image.length > 0 ? URL.createObjectURL(image[0]) : null;

const replaySubmit = async (data: ReplyFormValues) => {
    console.log("Reply Data:", data);

    const response = await createReply({
      postId: comment.post,
      commentId: comment._id,
      data: {
        body: data.body,
        image: data.image?.[0],
      },
    });

    console.log("API Response:", response);

    reset();
  };

  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit(replaySubmit)}>
        <div
          className={`relative rounded-sm bg-gray-200 transition-all duration-300`}
        >
          <Textarea
            {...register("body", {
              validate: (value) => {
                const image = watch("image");

                return value.trim().length > 0 || !!image?.length;
              },
            })}
            placeholder="write a comment..."
            className={`resize-none border-0 bg-transparent shadow-none focus-visible:ring-0`}
          />

          <div
            className={`pointer-events-none absolute bottom-2 left-3 right-3 flex items-center justify-between`}
          >
            <button
              type="submit"
              disabled={!isValid}
              className={`pointer-events-auto cursor-pointer transition-all duration-200 disabled:cursor-not-allowed`}
            >
              <RiSendInsFill
                className={`size-5 ${isValid ? "text-blue-500" : "text-gray-500"}`}
              />
            </button>

            <label className="pointer-events-auto cursor-pointer">
              <LuCamera className="size-6" />

              <input
                {...register("image")}
                className="hidden"
                accept="image/*"
                type="file"
              />
            </label>
          </div>
        </div>
      </form>

      {previewUrl && (
        <div className="relative mt-3 size-20">
          <img src={previewUrl} alt="preview" />

          <button
            className="absolute -top-1 -right-1 bg-gray-900 rounded-full cursor-pointer"
            onClick={() => setValue("image", null, { shouldValidate: true })}
            type="button"
          >
            <MdClose className="size-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
