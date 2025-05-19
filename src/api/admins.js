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

export const fetchTodayVisits = async () => {
	const res = await fetch(`${API_BASE_URL}/api/admin/visits/today`);

	await handleAuthError(res);
	if (!res.ok) throw new Error("방문자 수 조회 실패");

	return res.json();
};

export const fetchRecentVisits = async () => {
	const res = await fetch(`${API_BASE_URL}/api/admin/visits/recent`);

	await handleAuthError(res);
	if (!res.ok) throw new Error("방문자 수 조회 실패");

	return res.json();
};
