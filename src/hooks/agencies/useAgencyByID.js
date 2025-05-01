import { useQuery } from "@tanstack/react-query";
import { fetchAgencyById } from "../../api/agencies";

export const useAgencyById = (id, options = {}) => {
	return useQuery({
		queryKey: ["agency", id],
		queryFn: () => fetchAgencyById(id),
		staleTime: 1000 * 60 * 5,
		enabled: options.enabled ?? !!id,
	});
};
