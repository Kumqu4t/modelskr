import { useQuery } from "@tanstack/react-query";
import { fetchModels } from "../../api/models";

export const useModels = (filters, fields = "", options = {}) => {
	return useQuery({
		queryKey: ["models", filters, fields],
		queryFn: async () => {
			const { models, totalCount } = await fetchModels({ ...filters, fields });
			return { models, totalCount };
		},
		staleTime: 1000 * 60 * 5,
		keepPreviousData: true,
		enabled: options.enabled ?? true,
	});
};
