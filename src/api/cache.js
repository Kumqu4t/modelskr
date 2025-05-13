import { API_BASE_URL, getHeaders } from ".";
import { handleAuthError } from "../utils/handleAuthError";

export const clearCache = async () => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/admin/clear-cache`, {
			method: "POST",
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) {
			throw new Error("백엔드 캐시 초기화에 실패했습니다.");
		}

		return res;
	} catch (error) {
		console.error("clearCache error:", error);
		throw error;
	}
};
