import { useMutation } from "@tanstack/react-query";
import { removeImage } from "../api/upload";

export const useRemoveImage = () => {
	return useMutation({
		mutationFn: removeImage,
	});
};
