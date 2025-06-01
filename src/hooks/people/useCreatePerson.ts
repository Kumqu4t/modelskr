import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPerson } from "../../api/people";
import type { Person, CreatePersonInput } from "../../types/person";

export const useCreatePerson = () => {
	const queryClient = useQueryClient();

	return useMutation<Person, unknown, CreatePersonInput>({
		mutationFn: createPerson,
		onSuccess: () => {
			// queryClient.invalidateQueries(["people"] as const);
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "people",
			});
		},
	});
};
