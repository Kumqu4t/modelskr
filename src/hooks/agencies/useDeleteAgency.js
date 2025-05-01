import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAgency } from "../../api/agencies";

export const useDeleteAgency = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAgency,
		onSuccess: () => {
			queryClient.invalidateQueries(["agencies"]);
		},
	});
};
