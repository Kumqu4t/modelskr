import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgency } from "../../api/agencies";

export const useCreateAgency = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createAgency,
		onSuccess: () => {
			queryClient.invalidateQueries(["agencies"]);
		},
	});
};
