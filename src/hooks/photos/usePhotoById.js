import { useQuery } from "@tanstack/react-query";
import { fetchPhotoById } from "../../api/photo";

export const usePhotoById = (id, options = {}) => {
	return useQuery({
		queryKey: ["photo", id],
		queryFn: () => fetchPhotoById(id),
		staleTime: 1000 * 60 * 5,
		enabled: options.enabled ?? !!id,
	});
};
