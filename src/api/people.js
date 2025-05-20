import { API_BASE_URL, getHeaders } from ".";
import { handleAuthError } from "../utils/handleAuthError";

export const fetchPeople = async ({
	gender,
	agency,
	role,
	keyword = "",
	fields = "",
	page = 1,
	limit = 16,
}) => {
	try {
		const params = new URLSearchParams();

		if (gender && gender !== "all") params.set("gender", gender);
		if (agency && agency !== "all") params.set("agency", agency);
		if (role && role !== "all") params.set("role", role);
		if (keyword) params.set("keyword", keyword);
		if (fields) params.set("fields", fields);
		params.set("page", page);
		params.set("limit", limit);

		const res = await fetch(`${API_BASE_URL}/api/people?${params.toString()}`, {
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("인물 데이터를 불러오는 데 실패했습니다.");
		return res.json();
	} catch (error) {
		console.error("fetchPeople error:", error);
		throw error;
	}
};

export const fetchPersonById = async (id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/people/${id}`, {
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("아티스트 데이터를 불러오지 못했습니다.");
		return res.json();
	} catch (error) {
		console.error("fetchPersonById error:", error);
		throw error;
	}
};

export const createPerson = async (data) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/people`, {
			method: "POST",
			headers: getHeaders(localStorage.getItem("token")),
			body: JSON.stringify(data),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("아티스트 생성 실패");
		return res.json();
	} catch (error) {
		console.error("createPerson error:", error);
		throw error;
	}
};

export const updatePerson = async (id, data) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/people/${id}`, {
			method: "PATCH",
			headers: getHeaders(localStorage.getItem("token")),
			body: JSON.stringify(data),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("아티스트 수정 실패");
		return res.json();
	} catch (error) {
		console.error("updatePerson error:", error);
		throw error;
	}
};

export const deletePerson = async (id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/people/${id}`, {
			method: "DELETE",
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("아티스트 삭제 실패");
		return res.json();
	} catch (error) {
		console.error("deletePerson error:", error);
		throw error;
	}
};
