import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../../api/photo";

export const usePhotos = (filters = {}, options = {}) => {
	return useQuery({
		queryKey: ["photos", filters],
		queryFn: async () => {
			const { photos, totalCount } = await fetchPhotos(filters);
			return { photos, totalCount };
		},
		staleTime: 1000 * 60 * 5,
		keepPreviousData: true,
		enabled: options.enabled ?? true,
	});
};
