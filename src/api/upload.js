import { API_BASE_URL } from ".";

export const uploadImage = async (files) => {
	const formData = new FormData();
	files.forEach((file) => {
		formData.append("images", file);
	});

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

export const removeImage = async (public_id) => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/upload/remove`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ public_id }),
		});

		if (!res.ok) {
			throw new Error("이미지 삭제 실패");
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("이미지 삭제 중 오류 발생:", error);
		throw error;
	}
};
