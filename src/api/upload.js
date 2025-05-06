import { API_BASE_URL } from ".";

export const uploadImage = async (file) => {
	const formData = new FormData();
	formData.append("image", file);

	try {
		const res = await fetch(`${API_BASE_URL}/api/upload`, {
			method: "POST",
			body: formData,
		});

		if (!res.ok) {
			throw new Error("이미지 업로드 실패");
		}

		const data = await res.json();
		// console.log("업로드된 데이터:", data);

		return data;
	} catch (error) {
		console.error("이미지 업로드 중 오류 발생:", error);
		throw error;
	}
};
