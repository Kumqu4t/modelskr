import React, { useState, useEffect } from "react";

function ModelForm({ mode, model, onSubmit }) {
	const [formData, setFormData] = useState({
		name: "",
		image: "",
		description: "",
		tags: [],
		recentWork: [],
	});

	// edit 모드일 경우 초기값 설정
	useEffect(() => {
		if (mode === "edit" && model) {
			setFormData(model);
		}
	}, [mode, model]);

	// 공통 입력 핸들러
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// 폼 제출 처리
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>{mode === "edit" ? "모델 수정" : "모델 추가"}</h2>

			<label>
				이름
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</label>

			<label>
				이미지 URL
				<input
					type="text"
					name="image"
					value={formData.image}
					onChange={handleChange}
				/>
			</label>

			<label>
				설명
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
				/>
			</label>

			{/* TODO: tags, recentWork는 나중에 따로 구성 */}
			<button type="submit">{mode === "edit" ? "수정" : "저장"}</button>
		</form>
	);
}

export default ModelForm;
