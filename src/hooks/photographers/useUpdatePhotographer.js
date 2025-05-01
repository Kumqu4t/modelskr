import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePhotographer } from "../../api/photographers";

export const useUpdatePhotographer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updatePhotographer(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["photographers"]);
		},
	});
};
