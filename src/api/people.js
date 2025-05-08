import { API_BASE_URL, getHeaders } from ".";

export const fetchPeople = async ({
	gender,
	role,
	keyword = "",
	fields = "",
}) => {
	const params = new URLSearchParams();

	if (gender && gender !== "all") params.set("gender", gender);
	if (role && role !== "all") params.set("role", role);
	if (keyword) params.set("keyword", keyword);
	if (fields) params.set("fields", fields);

	const res = await fetch(`${API_BASE_URL}/api/people?${params.toString()}`, {
		headers: getHeaders(localStorage.getItem("token")),
	});

	if (!res.ok) throw new Error("아티스트 데이터를 불러오는 데 실패했습니다.");

	return res.json();
};

export const fetchPersonById = async (id) => {
	const res = await fetch(`${API_BASE_URL}/api/people/${id}`, {
		headers: getHeaders(localStorage.getItem("token")),
	});

	if (!res.ok) throw new Error("아티스트 데이터를 불러오지 못했습니다.");
	return res.json();
};

export const createPerson = async (data) => {
	const res = await fetch(`${API_BASE_URL}/api/people`, {
		method: "POST",
		headers: getHeaders(localStorage.getItem("token")),
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("아티스트 생성 실패");
	return res.json();
};

export const updatePerson = async (id, data) => {
	const res = await fetch(`${API_BASE_URL}/api/people/${id}`, {
		method: "PATCH",
		headers: getHeaders(localStorage.getItem("token")),
		body: JSON.stringify(data),
	});

	if (!res.ok) throw new Error("아티스트 수정 실패");
	return res.json();
};

export const deletePerson = async (id) => {
	const res = await fetch(`${API_BASE_URL}/api/people/${id}`, {
		method: "DELETE",
		headers: getHeaders(localStorage.getItem("token")),
	});

	if (!res.ok) throw new Error("아티스트 삭제 실패");
	return res.json();
};
