import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { LuLoaderCircle } from "react-icons/lu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


interface DeletePostDialogProps {
  open: boolean;
  isPending: boolean;
  isSuccess: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function DeletePostDialog({
  open,
  isPending,
  onConfirm,
  onOpenChange,
}: DeletePostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete post?</DialogTitle>
        </DialogHeader>

        <DropdownMenuSeparator className="border border-gray-200" />

        <p className="text-lg my-3">
          Are you sure you want to delete this post ?
        </p>

        <div className="flex justify-end gap-2 pt-3 pb-2">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-md border px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-white cursor-pointer"
          >
            Delete
          </button>
        </div>

        {isPending && (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-white/70 backdrop-blur-sm">
            <LuLoaderCircle className="size-8 animate-spin text-red-500" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
