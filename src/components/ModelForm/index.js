import React, { useState, useEffect } from "react";
import "./ModelForm.css";

function ModelForm({ mode, model, onSubmit, agencies }) {
	const [formData, setFormData] = useState({
		name: "",
		image: "",
		description: "",
		gender: "",
		agency: "",
		tags: "",
		recentWork: "",
		contact: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		gender: "",
		agency: "",
	});

	useEffect(() => {
		if (mode === "edit" && model) {
			setFormData({
				...model,
				gender: model.gender || "",
				agency: model.agency?._id || "",
				tags: model.tags?.join(", ") || "",
				recentWork:
					model.recentWork
						?.map((work) => `${work.type}:${work.title}:${work.link}`)
						.join(", ") || "",
				contact: model.contact || "",
			});
		}
	}, [mode, model]);

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
		if (!formData.name) formErrors.name = "이름을 입력해주세요.";
		if (!formData.gender) formErrors.gender = "성별을 선택해주세요.";
		if (!formData.agency) formErrors.agency = "에이전시를 선택해주세요.";

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		const tagsArray = formData.tags
			.split(",")
			.map((t) => t.trim())
			.filter((t) => t);

		const recentWorkArray = formData.recentWork
			.split(",")
			.map((item) => {
				const [type, title, ...linkParts] = item
					.split(":")
					.map((s) => s.trim());
				const link = linkParts.join(":");
				if (type && title && link) {
					return { type, title, link };
				}
				return null;
			})
			.filter(Boolean);

		const processedData = {
			...formData,
			tags: tagsArray,
			recentWork: recentWorkArray,
		};
		onSubmit(processedData);
	};

	return (
		<form onSubmit={handleSubmit} className="model-form">
			<h2 className="model-form__title">
				{mode === "edit" ? "모델 수정" : "모델 추가"}
			</h2>

			<label className="model-form__field">
				<span className="model-form__label">
					이름 <span className="model-form__required">*</span>
				</span>
				<input
					className="model-form__input"
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					aria-describedby="nameError"
				/>
				<div id="nameError" className="model-form__error">
					{errors.name}
				</div>
			</label>

			<label className="model-form__field">
				<span className="model-form__label">
					성별 <span className="model-form__required">*</span>
				</span>
				<select
					className="model-form__input"
					name="gender"
					value={formData.gender}
					onChange={handleChange}
					required
					aria-describedby="genderError"
				>
					<option value="">선택하세요</option>
					<option value="male">남성</option>
					<option value="female">여성</option>
				</select>
				<div id="genderError" className="model-form__error">
					{errors.gender}
				</div>
			</label>

			<label className="model-form__field">
				<span className="model-form__label">
					에이전시 <span className="model-form__required">*</span>
				</span>
				<select
					className="model-form__input"
					name="agency"
					value={formData.agency}
					onChange={handleChange}
					required
					aria-describedby="agencyError"
				>
					<option value="">선택하세요</option>
					{agencies.map((agency) => (
						<option key={agency._id} value={agency._id}>
							{agency.name}
						</option>
					))}
				</select>
				<div id="agencyError" className="model-form__error">
					{errors.agency}
				</div>
			</label>

			<label className="model-form__field">
				설명
				<textarea
					className="model-form__input"
					name="description"
					value={formData.description}
					onChange={handleChange}
				/>
			</label>

			<label className="model-form__field">
				이미지 URL
				<input
					className="model-form__input"
					type="text"
					name="image"
					value={formData.image}
					onChange={handleChange}
				/>
			</label>

			<label className="model-form__field">
				태그 (쉼표로 구분)
				<input
					className="model-form__input"
					type="text"
					name="tags"
					value={formData.tags}
					onChange={handleChange}
				/>
			</label>

			<label className="model-form__field">
				최근 작업 (형식: type:title:link, 쉼표로 구분)
				<input
					className="model-form__input"
					type="text"
					name="recentWork"
					value={formData.recentWork}
					onChange={handleChange}
				/>
			</label>

			<label className="model-form__field">
				contact (instagram 주소, email 등)
				<input
					className="model-form__input"
					type="text"
					name="contact"
					value={formData.contact}
					onChange={handleChange}
				/>
			</label>

			<button type="submit" className="model-form__submit">
				{mode === "edit" ? "수정" : "저장"}
			</button>
		</form>
	);
}

export default ModelForm;
