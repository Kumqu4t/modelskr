import { API_BASE_URL, getHeaders } from ".";
import { handleAuthError } from "../utils/handleAuthError";

export const fetchModels = async ({
	gender,
	agency,
	height,
	keyword = "",
	fields = "",
	page = 1,
	limit = 16,
}) => {
	try {
		const params = new URLSearchParams();

		if (gender && gender !== "all") params.set("gender", gender);
		if (agency && agency !== "all") params.set("agency", agency);
		if (height && height !== "all") params.set("height", height);
		if (keyword) params.set("keyword", keyword);
		if (fields) params.set("fields", fields);
		params.set("page", page);
		params.set("limit", limit);

		const res = await fetch(`${API_BASE_URL}/api/models?${params.toString()}`, {
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("모델 데이터를 불러오는 데 실패했습니다.");

		return res.json();
	} catch (error) {
		console.error("fetchModels error:", error);
		throw error;
	}
};

export const fetchModelById = async (id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/models/${id}`, {
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("모델 데이터를 불러오지 못했습니다.");
		return res.json();
	} catch (error) {
		console.error("fetchModelById error:", error);
		throw error;
	}
};

export const createModel = async (data) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/models`, {
			method: "POST",
			headers: getHeaders(localStorage.getItem("token")),
			body: JSON.stringify(data),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("모델 생성 실패");
		return res.json();
	} catch (error) {
		console.error("createModel error:", error);
		throw error;
	}
};

export const fetchRandomModels = async (limit = 4) => {
	try {
		const res = await fetch(
			`${API_BASE_URL}/api/models/random?limit=${limit}`,
			{
				headers: getHeaders(localStorage.getItem("token")),
			}
		);

		await handleAuthError(res);

		if (!res.ok) throw new Error("랜덤 모델을 불러오는 데 실패했습니다.");
		return res.json();
	} catch (error) {
		console.error("fetchRandomModels error:", error);
		throw error;
	}
};

export const updateModel = async (id, data) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/models/${id}`, {
			method: "PATCH",
			headers: getHeaders(localStorage.getItem("token")),
			body: JSON.stringify(data),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("모델 수정 실패");
		return res.json();
	} catch (error) {
		console.error("updateModel error:", error);
		throw error;
	}
};

export const deleteModel = async (id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/models/${id}`, {
			method: "DELETE",
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("모델 삭제 실패");
		return res.json();
	} catch (error) {
		console.error("deleteModel error:", error);
		throw error;
	}
};
