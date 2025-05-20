export const getCloudinaryWebp = (url) => {
	if (!url) return "";
	return url.replace("/upload/", "/upload/f_webp,q_auto/");
};
