import { useQuery } from "@tanstack/react-query";
import { fetchPersonById } from "../../api/people";

export const usePersonById = (id, options = {}) => {
	return useQuery({
		queryKey: ["person", id],
		queryFn: () => fetchPersonById(id),
		staleTime: 1000 * 60 * 5,
		enabled: options.enabled ?? !!id,
	});
};
