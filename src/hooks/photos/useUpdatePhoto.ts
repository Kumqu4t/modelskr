import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePhoto } from "../../api/photo";
import type { Photo, UpdatePhotoInput } from "../../types/photo";

export const useUpdatePhoto = () => {
	const queryClient = useQueryClient();

	return useMutation<Photo, unknown, { id: string; data: UpdatePhotoInput }>({
		mutationFn: ({ id, data }) => updatePhoto(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "photos",
			});
		},
	});
};
