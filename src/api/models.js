import { API_BASE_URL, getHeaders } from ".";

export const fetchModels = async ({
	gender,
	agency,
	height,
	keyword = "",
	fields = "",
	page = 1,
	limit = 16,
}) => {
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

	if (!res.ok) throw new Error("모델 데이터를 불러오는 데 실패했습니다.");

	return res.json();
};

export const fetchModelById = async (id) => {
	const res = await fetch(`${API_BASE_URL}/api/models/${id}`, {
		headers: getHeaders(localStorage.getItem("token")),
	});
	if (!res.ok) throw new Error("모델 데이터를 불러오지 못했습니다.");
	return res.json();
};

export const createModel = async (data) => {
	const res = await fetch(`${API_BASE_URL}/api/models`, {
		method: "POST",
		headers: getHeaders(localStorage.getItem("token")),
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("모델 생성 실패");
	return res.json();
};

export const fetchRandomModels = async (limit = 4) => {
	const res = await fetch(`${API_BASE_URL}/api/models/random?limit=${limit}`, {
		headers: getHeaders(localStorage.getItem("token")),
	});
	if (!res.ok) throw new Error("랜덤 모델을 불러오는 데 실패했습니다.");
	return res.json();
};

export const updateModel = async (id, data) => {
	const res = await fetch(`${API_BASE_URL}/api/models/${id}`, {
		method: "PATCH",
		headers: getHeaders(localStorage.getItem("token")),
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("모델 수정 실패");
	return res.json();
};

export const deleteModel = async (id) => {
	const res = await fetch(`${API_BASE_URL}/api/models/${id}`, {
		method: "DELETE",
		headers: getHeaders(localStorage.getItem("token")),
	});

	if (!res.ok) throw new Error("모델 삭제 실패");
	return res.json();
};
