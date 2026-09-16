import { uploadProfilePhoto } from "@/api/users/upload-photo.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUploadProfilePhoto(userId: string) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadProfilePhoto(file),

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["user-posts", userId],
      });

      await queryClient.refetchQueries({
        queryKey: ["profile-data"],
      });
    },
  });
}
