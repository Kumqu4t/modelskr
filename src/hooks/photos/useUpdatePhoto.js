import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePhoto } from "../../api/photo";

export const useUpdatePhoto = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updatePhoto(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["photos"]);
		},
	});
};
