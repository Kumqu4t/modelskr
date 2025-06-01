import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateModel } from "../../api/models";
import type { Model, UpdateModelInput } from "../../types/model";

export const useUpdateModel = () => {
	const queryClient = useQueryClient();

	return useMutation<Model, unknown, { id: string; data: UpdateModelInput }>({
		mutationFn: ({ id, data }) => updateModel(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "models",
			});
		},
	});
};
