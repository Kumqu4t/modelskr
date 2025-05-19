import { API_BASE_URL, getHeaders } from ".";
import { handleAuthError } from "../utils/handleAuthError";

export const fetchUsers = async ({ fields = "" }) => {
	try {
		const params = new URLSearchParams();
		if (fields) params.set("fields", fields);

		const res = await fetch(
			`${API_BASE_URL}/api/admin/getAllUsers?${params.toString()}`,
			{
				headers: getHeaders(localStorage.getItem("token")),
			}
		);

		await handleAuthError(res);

		if (!res.ok) {
			throw new Error("전체 유저 불러오기에 실패했습니다.");
		}

		return res;
	} catch (error) {
		console.error("fetchUsers error:", error);
		throw error;
	}
};
