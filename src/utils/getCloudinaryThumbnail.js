export const getCloudinaryThumbnail = (url, width = 300, height = 400) => {
	if (!url) return "";
	return url.replace(
		"/upload/",
		`/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
	);
};
