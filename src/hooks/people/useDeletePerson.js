import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePerson } from "../../api/people";

export const useDeletePerson = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deletePerson,
		onSuccess: () => {
			queryClient.invalidateQueries(["people"]);
		},
	});
};
