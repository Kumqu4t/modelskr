export const getCloudinaryWebp = (url: string | undefined): string => {
	if (!url) return "";
	return url.replace("/upload/", "/upload/f_webp,q_auto/");
};
