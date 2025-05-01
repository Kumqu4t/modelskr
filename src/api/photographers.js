import { API_BASE_URL, getHeaders } from ".";

export const fetchPhotographers = async ({
	gender,
	agency,
	selectedTags = [],
	keyword = "",
	fields = "",
}) => {
	const params = new URLSearchParams();

	if (gender && gender !== "all") params.set("gender", gender);
	if (agency && agency !== "all") params.set("agency", agency);
	selectedTags.forEach((tag) => params.append("tag", tag));
	if (keyword) params.set("keyword", keyword);
	if (fields) params.set("fields", fields);

	const res = await fetch(
		`${API_BASE_URL}/api/photographers?${params.toString()}`,
		{
			headers: getHeaders(localStorage.getItem("token")),
		}
	);

	if (!res.ok) throw new Error("포토그래퍼 데이터를 불러오는 데 실패했습니다.");
	return res.json();
};

export const fetchPhotographerById = async (id) => {
	const res = await fetch(`${API_BASE_URL}/api/photographers/${id}`, {
		headers: getHeaders(localStorage.getItem("token")),
	});

	if (!res.ok) throw new Error("포토그래퍼 데이터를 불러오지 못했습니다.");
	return res.json();
};

export const createPhotographer = async (data) => {
	const res = await fetch(`${API_BASE_URL}/api/photographers`, {
		method: "POST",
		headers: getHeaders(localStorage.getItem("token")),
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("포토그래퍼 생성 실패");
	return res.json();
};

export const updatePhotographer = async (id, data) => {
	const res = await fetch(`${API_BASE_URL}/api/photographers/${id}`, {
		method: "PATCH",
		headers: getHeaders(localStorage.getItem("token")),
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("포토그래퍼 수정 실패");
	return res.json();
};

export const deletePhotographer = async (id) => {
	const res = await fetch(`${API_BASE_URL}/api/photographers/${id}`, {
		method: "DELETE",
		headers: getHeaders(localStorage.getItem("token")),
	});

	if (!res.ok) throw new Error("포토그래퍼 삭제 실패");
	return res.json();
};
