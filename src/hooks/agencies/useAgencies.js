import { useQuery } from "@tanstack/react-query";
import { fetchAgencies } from "../../api/agencies";

export const useAgencies = (filters = {}, options = {}) => {
	return useQuery({
		queryKey: ["agencies", filters],
		queryFn: async () => {
			const { agencies, totalCount } = await fetchAgencies(filters);
			return { agencies, totalCount };
		},
		staleTime: 1000 * 60 * 5,
		enabled: options.enabled ?? true,
	});
};
