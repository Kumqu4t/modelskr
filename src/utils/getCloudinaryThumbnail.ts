export const getCloudinaryThumbnail = (
	url: string | undefined,
	width: number = 300,
	height: number = 400,
	crop: string = "fill"
): string => {
	if (!url) return "";
	return url.replace(
		"/upload/",
		`/upload/w_${width},h_${height},c_${crop},q_auto,f_auto/`
	);
};
