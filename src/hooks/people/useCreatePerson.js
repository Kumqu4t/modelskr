import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPerson } from "../../api/people";

export const useCreatePerson = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPerson,
		onSuccess: () => {
			queryClient.invalidateQueries(["people"]);
		},
	});
};
