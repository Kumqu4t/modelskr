import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePhotographer } from "../../api/photographers";

export const useDeletePhotographer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deletePhotographer,
		onSuccess: () => {
			queryClient.invalidateQueries(["photographers"]);
		},
	});
};
