import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../../api/people";

export const usePeople = (
	{ gender, role, keyword = "", fields = "" },
	options = {}
) => {
	return useQuery({
		queryKey: ["people", { gender, role, keyword, fields }],
		queryFn: () => fetchPeople({ gender, role, keyword, fields }),
		staleTime: 1000 * 60 * 5,
		keepPreviousData: true,
		enabled: options.enabled ?? true,
	});
};
