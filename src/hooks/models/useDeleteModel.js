import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteModel } from "../../api/models";

export const useDeleteModel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteModel,
		onSuccess: () => {
			queryClient.invalidateQueries(["models"]);
		},
	});
};
