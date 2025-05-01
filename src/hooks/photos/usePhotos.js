import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../../api/photo";

export const usePhotos = (
	{ selectedTags = [], keyword = "", fields = "", category = "all" },
	options = {}
) => {
	return useQuery({
		queryKey: ["photos", { selectedTags, keyword, fields, category }],
		queryFn: () => fetchPhotos({ selectedTags, keyword, fields, category }),
		staleTime: 1000 * 60 * 5,
		keepPreviousData: true,
		enabled: options.enabled ?? true,
	});
};
