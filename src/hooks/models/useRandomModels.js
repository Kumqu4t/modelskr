import { useQuery } from "@tanstack/react-query";
import { fetchRandomModels } from "../../api/models";

export const useRandomModels = (limit = 4) => {
	return useQuery({
		queryKey: ["randomModels", limit],
		queryFn: () => fetchRandomModels(limit),
		staleTime: 1000 * 60 * 60 * 12,
	});
};
