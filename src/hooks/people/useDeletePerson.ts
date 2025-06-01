import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePerson } from "../../api/people";
import type { Person } from "../../types/person";

export const useDeletePerson = () => {
	const queryClient = useQueryClient();

	return useMutation<Person, unknown, string>({
		mutationFn: deletePerson,
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "people",
			});
		},
	});
};
