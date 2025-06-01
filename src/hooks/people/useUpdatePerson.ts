import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePerson } from "../../api/people";
import type { Person, UpdatePersonInput } from "../../types/person";

export const useUpdatePerson = () => {
	const queryClient = useQueryClient();

	return useMutation<Person, unknown, { id: string; data: UpdatePersonInput }>({
		mutationFn: ({ id, data }) => updatePerson(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "people",
			});
		},
	});
};
