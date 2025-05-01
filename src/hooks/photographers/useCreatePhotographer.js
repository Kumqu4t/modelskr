import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPhotographer } from "../../api/photographers";

export const useCreatePhotographer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPhotographer,
		onSuccess: () => {
			queryClient.invalidateQueries(["photographers"]);
		},
	});
};
