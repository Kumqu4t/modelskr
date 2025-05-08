import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePerson } from "../../api/people";

export const useUpdatePerson = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updatePerson(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["people"]);
		},
	});
};
