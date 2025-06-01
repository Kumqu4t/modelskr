import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePhoto } from "../../api/photo";
import type { Photo } from "../../types/photo";

export const useDeletePhoto = () => {
	const queryClient = useQueryClient();

	return useMutation<Photo, unknown, string>({
		mutationFn: deletePhoto,
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "photos",
			});
		},
	});
};
