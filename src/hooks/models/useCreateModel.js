import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createModel } from "../../api/models";

export const useCreateModel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createModel,
		onSuccess: () => {
			queryClient.invalidateQueries(["models"]);
		},
	});
};
