import { useQuery } from "@tanstack/react-query";
import { fetchModelById } from "../../api/models";

export const useModelById = (id, options = {}) => {
	return useQuery({
		queryKey: ["model", id],
		queryFn: () => fetchModelById(id),
		staleTime: 1000 * 60 * 5,
		enabled: options.enabled ?? !!id,
	});
};
