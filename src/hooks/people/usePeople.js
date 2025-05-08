import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../../api/people";

export const usePeople = (
	{ gender, selectedTags = [], keyword = "", fields = "" },
	options = {}
) => {
	return useQuery({
		queryKey: ["people", { gender, selectedTags, keyword, fields }],
		queryFn: () => fetchPeople({ gender, selectedTags, keyword, fields }),
		staleTime: 1000 * 60 * 5,
		keepPreviousData: true,
		enabled: options.enabled ?? true,
	});
};
