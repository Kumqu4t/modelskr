import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/admins";

export const useUsers = ({ fields = "" } = {}) => {
	return useQuery({
		queryKey: ["users", fields],
		queryFn: () => fetchUsers({ fields }).then((res) => res.json()),
		staleTime: 1000 * 60 * 5,
	});
};
