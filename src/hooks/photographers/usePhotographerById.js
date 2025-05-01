import { useQuery } from "@tanstack/react-query";
import { fetchPhotographerById } from "../../api/photographers";

export const usePhotographerById = (id, options = {}) => {
	return useQuery({
		queryKey: ["photographer", id],
		queryFn: () => fetchPhotographerById(id),
		staleTime: 1000 * 60 * 5,
		enabled: options.enabled ?? !!id,
	});
};
