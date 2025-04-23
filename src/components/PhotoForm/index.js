import React, { useState, useEffect } from "react";
import "./PhotoForm.css";

function PhotoForm({ mode, photo, onSubmit }) {
	const [formData, setFormData] = useState({
		title: "",
		images: "",
		description: "",
		tags: "",
	});

	const [errors, setErrors] = useState({
		title: "",
		images: "",
	});

	useEffect(() => {
		if (mode === "edit" && photo) {
			setFormData({
				...photo,
				images: photo.images?.join(", ") || "",
				tags: photo.tags?.join(", ") || "",
			});
		}
	}, [mode, photo]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let formErrors = {};
		if (!formData.title) formErrors.title = "제목을 입력해주세요.";
		if (!formData.images) formErrors.images = "이미지 URL을 입력해주세요.";

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		const imagesArray = formData.images
			.split(",")
			.map((url) => url.trim())
			.filter((url) => url);

		const tagsArray = formData.tags
			.split(",")
			.map((t) => t.trim())
			.filter((t) => t);

		const processedData = {
			...formData,
			images: imagesArray,
			tags: tagsArray,
		};

		onSubmit(processedData);
	};

	return (
		<form onSubmit={handleSubmit} className="photo-form">
			<h2 className="photo-form__title">
				{mode === "edit" ? "사진 수정" : "사진 추가"}
			</h2>

			<label className="photo-form__field">
				<span className="photo-form__label">
					제목 <span className="photo-form__required">*</span>
				</span>
				<input
					className="photo-form__input"
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
					aria-describedby="titleError"
				/>
				<div id="titleError" className="photo-form__error">
					{errors.title}
				</div>
			</label>

			<label className="photo-form__field">
				<span className="photo-form__label">
					이미지 URL <span className="photo-form__required">*</span>
				</span>
				<input
					className="photo-form__input"
					type="text"
					name="images"
					value={formData.images}
					onChange={handleChange}
					required
					aria-describedby="imagesError"
				/>
				<div id="imagesError" className="photo-form__error">
					{errors.images}
				</div>
			</label>

			<label className="photo-form__field">
				설명
				<textarea
					className="photo-form__input"
					name="description"
					value={formData.description}
					onChange={handleChange}
				/>
			</label>

			<label className="photo-form__field">
				태그 (쉼표로 구분)
				<input
					className="photo-form__input"
					type="text"
					name="tags"
					value={formData.tags}
					onChange={handleChange}
				/>
			</label>

			<button type="submit" className="photo-form__submit">
				{mode === "edit" ? "수정" : "저장"}
			</button>
		</form>
	);
}

export default PhotoForm;
