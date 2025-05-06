import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../api/upload";

export const useUpload = () => {
	return useMutation({
		mutationFn: uploadImage,
	});
};
