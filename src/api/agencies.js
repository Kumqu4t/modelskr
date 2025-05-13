import { API_BASE_URL, getHeaders } from ".";
import { handleAuthError } from "../utils/handleAuthError";

export const fetchAgencies = async ({
	keyword = "",
	fields = "",
	page = 1,
	limit = 16,
}) => {
	try {
		const params = new URLSearchParams();
		if (keyword) params.set("keyword", keyword);
		if (fields) params.set("fields", fields);
		params.set("page", page);
		params.set("limit", limit);

		const res = await fetch(
			`${API_BASE_URL}/api/agencies?${params.toString()}`,
			{
				headers: getHeaders(localStorage.getItem("token")),
			}
		);

		await handleAuthError(res);

		if (!res.ok) throw new Error("에이전시 목록을 불러오지 못했습니다.");
		return res.json();
	} catch (error) {
		console.error("fetchAgencies error:", error);
		throw error;
	}
};

export const fetchAgencyById = async (id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/agencies/${id}`, {
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("에이전시 데이터를 불러오지 못했습니다.");
		return res.json();
	} catch (error) {
		console.error("fetchAgencyById error:", error);
		throw error;
	}
};

export const createAgency = async (data) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/agencies`, {
			method: "POST",
			headers: getHeaders(localStorage.getItem("token")),
			body: JSON.stringify(data),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("에이전시 생성 실패");
		return res.json();
	} catch (error) {
		console.error("createAgency error:", error);
		throw error;
	}
};

export const updateAgency = async (id, data) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/agencies/${id}`, {
			method: "PATCH",
			headers: getHeaders(localStorage.getItem("token")),
			body: JSON.stringify(data),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("에이전시 수정 실패");
		return res.json();
	} catch (error) {
		console.error("updateAgency error:", error);
		throw error;
	}
};

export const deleteAgency = async (id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/agencies/${id}`, {
			method: "DELETE",
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("에이전시 삭제 실패");
		return res.json();
	} catch (error) {
		console.error("deleteAgency error:", error);
		throw error;
	}
};
