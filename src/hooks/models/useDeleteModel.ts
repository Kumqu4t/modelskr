import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteModel } from "../../api/models";
import type { Model } from "../../types/model";

export const useDeleteModel = () => {
	const queryClient = useQueryClient();

	return useMutation<Model, unknown, string>({
		mutationFn: deleteModel,
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "models",
			});
		},
	});
};
