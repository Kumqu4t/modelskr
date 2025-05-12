import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../../api/people";

export const usePeople = (filters, fields = "", options = {}) => {
	return useQuery({
		queryKey: ["people", filters, fields],
		queryFn: async () => {
			const { people, totalCount } = await fetchPeople({ ...filters, fields });
			return { people, totalCount };
		},
		staleTime: 1000 * 60 * 5,
		keepPreviousData: true,
		enabled: options.enabled ?? true,
	});
};
