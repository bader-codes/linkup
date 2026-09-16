import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type { ProfileUser } from "@/types/users/profile-data-response";
import useUploadProfilePhoto from "@/hooks/users/use-upload-photo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

type ChangePhotoProps = {
  open: boolean;
  user: ProfileUser;
  onOpenChange: (open: boolean) => void;
};

export default function ChangePhoto({
  open,
  user,
  onOpenChange,
}: ChangePhotoProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { setUser } = useContext(AuthContext)!;

  const { mutate, isPending } = useUploadProfilePhoto(user._id);

  const handleDialogChange = (open: boolean) => {
    onOpenChange(open);

    if (!open) {
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  const handleSavePhoto = () => {
    if (!selectedFile) return;

    mutate(selectedFile, {
      onSuccess: async (response) => {
        const updatedUser = {
          ...user,
          photo: response.data.photo,
        };

        // Keep the new photo synced in both persisted storage and the React state.
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        setPreview(null);
        setSelectedFile(null);

        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="w-[calc(100%-2rem)] px-4 sm:min-w-sm md:min-w-lg">
        {isPending && (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-3 text-white">
              <div className="size-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />

              <span className="text-sm font-medium">Saving photo...</span>
            </div>
          </div>
        )}

        <DialogHeader className="items-center justify-center">
          <DialogTitle>Profile Photo</DialogTitle>
        </DialogHeader>

        <DropdownMenuSeparator className="border-gray-200" />

        <div className="flex justify-center">
          <Avatar className="size-72">
            <AvatarImage
              src={preview ?? user.photo}
              alt={user.name}
              className="object-cover"
            />

            <AvatarFallback className="text-4xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <DropdownMenuSeparator className="border-gray-200" />

        <div className="w-full">
          {selectedFile ? (
            <button
              type="button"
              onClick={handleSavePhoto}
              disabled={isPending}
              className="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
            >
              Save photo
            </button>
          ) : (
            <label
              htmlFor="profile-photo"
              className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Change photo
            </label>
          )}

          <input
            id="profile-photo"
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
