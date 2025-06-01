import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAgency } from "../../api/agencies";
import type { Agency, UpdateAgencyInput } from "../../types/agency";

export const useUpdateAgency = () => {
	const queryClient = useQueryClient();

	return useMutation<Agency, unknown, { id: string; data: UpdateAgencyInput }>({
		mutationFn: ({ id, data }) => updateAgency(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "agencies",
			});
		},
	});
};
