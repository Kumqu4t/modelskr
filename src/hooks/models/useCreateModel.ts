import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createModel } from "../../api/models";
import type { Model, CreateModelInput } from "../../types/model";

export const useCreateModel = () => {
	const queryClient = useQueryClient();

	return useMutation<Model, unknown, CreateModelInput>({
		mutationFn: createModel,
		onSuccess: () => {
			// queryClient.invalidateQueries(["models"] as const);
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "models",
			});
		},
	});
};
