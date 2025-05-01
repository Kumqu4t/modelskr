import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../../api/photo";

export const usePhotos = (
	{ selectedTags = [], keyword = "", fields = "" },
	options = {}
) => {
	return useQuery({
		queryKey: ["photos", { selectedTags, keyword, fields }],
		queryFn: () => fetchPhotos({ selectedTags, keyword, fields }),
		staleTime: 1000 * 60 * 5,
		keepPreviousData: true,
		enabled: options.enabled ?? true,
	});
};
