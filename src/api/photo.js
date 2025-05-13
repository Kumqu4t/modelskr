import { API_BASE_URL, getHeaders } from ".";
import { handleAuthError } from "../utils/handleAuthError";

export const fetchPhotos = async ({
	keyword = "",
	fields = "",
	selectedTags = [],
	category = "all",
	page = 1,
	limit = 16,
}) => {
	try {
		const params = new URLSearchParams();

		selectedTags.forEach((tag) => params.append("tag", tag));
		if (keyword) params.set("keyword", keyword);
		if (fields) params.set("fields", fields);
		if (category && category !== "all") params.set("category", category);
		params.set("page", page);
		params.set("limit", limit);

		const res = await fetch(`${API_BASE_URL}/api/photos?${params.toString()}`, {
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("포토 데이터를 불러오는 데 실패했습니다.");
		return res.json();
	} catch (error) {
		console.error("fetchPhotos error:", error);
		throw error;
	}
};

export const fetchPhotoById = async (id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/photos/${id}`, {
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("포토 데이터를 불러오지 못했습니다.");
		return res.json();
	} catch (error) {
		console.error("fetchPhotoById error:", error);
		throw error;
	}
};

export const createPhoto = async (data) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/photos`, {
			method: "POST",
			headers: getHeaders(localStorage.getItem("token")),
			body: JSON.stringify(data),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("포토 생성 실패");
		return res.json();
	} catch (error) {
		console.error("createPhoto error:", error);
		throw error;
	}
};

export const updatePhoto = async (id, data) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/photos/${id}`, {
			method: "PATCH",
			headers: getHeaders(localStorage.getItem("token")),
			body: JSON.stringify(data),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("포토 수정 실패");
		return res.json();
	} catch (error) {
		console.error("updatePhoto error:", error);
		throw error;
	}
};

export const deletePhoto = async (id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/photos/${id}`, {
			method: "DELETE",
			headers: getHeaders(localStorage.getItem("token")),
		});

		await handleAuthError(res);

		if (!res.ok) throw new Error("포토 삭제 실패");
		return res.json();
	} catch (error) {
		console.error("deletePhoto error:", error);
		throw error;
	}
};
