import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPhoto } from "../../api/photo";
import type { Photo, CreatePhotoInput } from "../../types/photo";

export const useCreatePhoto = () => {
	const queryClient = useQueryClient();

	return useMutation<Photo, unknown, CreatePhotoInput>({
		mutationFn: createPhoto,
		onSuccess: () => {
			// queryClient.invalidateQueries(["photos"] as const);
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "photos",
			});
		},
	});
};
