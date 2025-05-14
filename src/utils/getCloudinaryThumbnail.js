export const getCloudinaryThumbnail = (
	url,
	width = 300,
	height = 400,
	crop = "fill"
) => {
	if (!url) return "";
	return url.replace(
		"/upload/",
		`/upload/w_${width},h_${height},c_${crop},q_auto,f_auto/`
	);
};
