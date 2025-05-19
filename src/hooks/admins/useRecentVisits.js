import { useQuery } from "@tanstack/react-query";
import { fetchRecentVisits } from "../../api/admins";

export const useRecentVisits = () => {
	return useQuery({
		queryKey: ["recentVisits"],
		queryFn: fetchRecentVisits,
		staleTime: 1000 * 60 * 60 * 12,
	});
};
