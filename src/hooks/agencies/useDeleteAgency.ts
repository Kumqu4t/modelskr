import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAgency } from "../../api/agencies";
import type { Agency } from "../../types/agency";

export const useDeleteAgency = () => {
	const queryClient = useQueryClient();

	return useMutation<Agency, unknown, string>({
		mutationFn: deleteAgency,
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "agencies",
			});
		},
	});
};
