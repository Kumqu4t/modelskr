import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAgency } from "../../api/agencies";

export const useUpdateAgency = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateAgency(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["agencies"]);
		},
	});
};
