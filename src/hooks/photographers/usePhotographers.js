import { useQuery } from "@tanstack/react-query";
import { fetchPhotographers } from "../../api/photographers";

export const usePhotographers = (
	{ gender, agency, selectedTags = [], keyword = "", fields = "" },
	options = {}
) => {
	return useQuery({
		queryKey: [
			"photographers",
			{ gender, agency, selectedTags, keyword, fields },
		],
		queryFn: () =>
			fetchPhotographers({ gender, agency, selectedTags, keyword, fields }),
		staleTime: 1000 * 60 * 5,
		keepPreviousData: true,
		enabled: options.enabled ?? true,
	});
};
