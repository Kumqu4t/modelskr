import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPhoto } from "../../api/photo";

export const useCreatePhoto = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPhoto,
		onSuccess: () => {
			queryClient.invalidateQueries(["photos"]);
		},
	});
};
