import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateModel } from "../../api/models";

export const useUpdateModel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateModel(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["models"]);
		},
	});
};
