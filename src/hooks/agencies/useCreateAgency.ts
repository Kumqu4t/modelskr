import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgency } from "../../api/agencies";
import type { Agency, CreateAgencyInput } from "../../types/agency";

export const useCreateAgency = () => {
	const queryClient = useQueryClient();

	return useMutation<Agency, unknown, CreateAgencyInput>({
		mutationFn: createAgency,
		onSuccess: () => {
			// queryClient.invalidateQueries(["agencies"] as const);
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "agencies",
			});
		},
	});
};
