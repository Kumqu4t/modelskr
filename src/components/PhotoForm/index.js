import React, { useState, useEffect } from "react";
import "./PhotoForm.css";

function PhotoForm({ mode, photo, onSubmit }) {
	const [formData, setFormData] = useState({
		title: "",
		images: "",
		description: "",
		tags: "",
		models: [],
		photographers: [],
	});

	const [errors, setErrors] = useState({
		title: "",
		images: "",
	});

	const [models, setModels] = useState([]);
	const [photographers, setPhotographers] = useState([]);

	// 모델과 포토그래퍼 데이터 가져오기
	useEffect(() => {
		const fetchData = async () => {
			try {
				const modelsRes = await fetch("/api/models");
				const modelsData = await modelsRes.json();
				setModels(modelsData);

				const photographersRes = await fetch("/api/photographers");
				const photographersData = await photographersRes.json();
				setPhotographers(photographersData);
			} catch (err) {
				console.error("데이터 불러오기 실패:", err);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (mode === "edit" && photo) {
			setFormData({
				...photo,
				images: photo.images?.join(", ") || "",
				tags: photo.tags?.join(", ") || "",
				models: photo.models?.map((m) => m._id) || [],
				photographers: photo.photographers?.map((p) => p._id) || [],
			});
		}
	}, [mode, photo]);

	const handleChange = (e) => {
		const { name, value, type, options } = e.target;
		if (type === "select-multiple") {
			const selectedValues = Array.from(options)
				.filter((option) => option.selected)
				.map((option) => option.value);
			setFormData((prev) => ({
				...prev,
				[name]: selectedValues,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
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

			<label className="photo-form__field">
				모델 선택
				<select
					className="photo-form__input"
					name="models"
					multiple
					value={formData.models}
					onChange={handleChange}
				>
					{models.map((model) => (
						<option key={model._id} value={model._id}>
							{model.name}
						</option>
					))}
				</select>
			</label>

			<label className="photo-form__field">
				포토그래퍼 선택
				<select
					className="photo-form__input"
					name="photographers"
					multiple
					value={formData.photographers}
					onChange={handleChange}
				>
					{photographers.map((photographer) => (
						<option key={photographer._id} value={photographer._id}>
							{photographer.name}
						</option>
					))}
				</select>
			</label>

			<button type="submit" className="photo-form__submit">
				{mode === "edit" ? "수정" : "저장"}
			</button>
		</form>
	);
}

export default PhotoForm;
