import { API_BASE_URL, getHeaders } from ".";

export const fetchPhotos = async ({
	keyword = "",
	fields = "",
	selectedTags = [],
	category = "all",
	page = 1,
	limit = 16,
}) => {
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

	if (!res.ok) throw new Error("포토 데이터를 불러오는 데 실패했습니다.");
	return res.json();
};

export const fetchPhotoById = async (id) => {
	const res = await fetch(`${API_BASE_URL}/api/photos/${id}`, {
		headers: getHeaders(localStorage.getItem("token")),
	});

	if (!res.ok) throw new Error("포토 데이터를 불러오지 못했습니다.");
	return res.json();
};

export const createPhoto = async (data) => {
	const res = await fetch(`${API_BASE_URL}/api/photos`, {
		method: "POST",
		headers: getHeaders(localStorage.getItem("token")),
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("포토 생성 실패");
	return res.json();
};

export const updatePhoto = async (id, data) => {
	const res = await fetch(`${API_BASE_URL}/api/photos/${id}`, {
		method: "PATCH",
		headers: getHeaders(localStorage.getItem("token")),
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("포토 수정 실패");
	return res.json();
};

export const deletePhoto = async (id) => {
	const res = await fetch(`${API_BASE_URL}/api/photos/${id}`, {
		method: "DELETE",
		headers: getHeaders(localStorage.getItem("token")),
	});

	if (!res.ok) throw new Error("포토 삭제 실패");
	return res.json();
};
