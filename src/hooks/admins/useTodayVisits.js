import { useQuery } from "@tanstack/react-query";
import { fetchTodayVisits } from "../../api/admins";

export const useTodayVisits = () => {
	return useQuery({
		queryKey: ["todayVisits"],
		queryFn: fetchTodayVisits,
		staleTime: 1000 * 60,
	});
};
