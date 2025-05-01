import { useQuery } from "@tanstack/react-query";
import { fetchAgencies } from "../../api/agencies";

export const useAgencies = (
	{ keyword = "", fields = "" } = {},
	options = {}
) => {
	return useQuery({
		queryKey: ["agencies", { keyword, fields }],
		queryFn: () => fetchAgencies({ keyword, fields }),
		staleTime: 1000 * 60 * 5,
		enabled: options.enabled ?? true,
	});
};
