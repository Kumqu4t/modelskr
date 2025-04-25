import React, { useEffect, useState } from "react";
import "./AgencyForm.css";

function AgencyForm({ mode, item, onSubmit }) {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		logo: "",
		homepage: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		description: "",
		logo: "",
		homepage: "",
	});

	useEffect(() => {
		if (mode === "edit" && item) {
			setFormData({
				name: item.name || "",
				description: item.description || "",
				logo: item.logo || "",
				homepage: item.homepage || "",
			});
		}
	}, [mode, item]);

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
		if (!formData.description) formErrors.description = "설명을 입력해주세요.";
		if (!formData.logo) formErrors.logo = "로고 URL을 입력해주세요.";
		if (!formData.homepage)
			formErrors.homepage = "홈페이지 주소를 입력해주세요.";

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="model-form">
			<h2 className="model-form__title">
				{mode === "edit" ? "에이전시 수정" : "에이전시 추가"}
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
				/>
				<div className="model-form__error">{errors.name}</div>
			</label>

			<label className="model-form__field">
				<span className="model-form__label">
					설명 <span className="model-form__required">*</span>
				</span>
				<textarea
					className="model-form__input"
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
				/>
				<div className="model-form__error">{errors.description}</div>
			</label>

			<label className="model-form__field">
				<span className="model-form__label">
					로고 URL <span className="model-form__required">*</span>
				</span>
				<input
					className="model-form__input"
					type="text"
					name="logo"
					value={formData.logo}
					onChange={handleChange}
					required
				/>
				<div className="model-form__error">{errors.logo}</div>
			</label>

			<label className="model-form__field">
				<span className="model-form__label">
					홈페이지 <span className="model-form__required">*</span>
				</span>
				<input
					className="model-form__input"
					type="text"
					name="homepage"
					value={formData.homepage}
					onChange={handleChange}
					required
				/>
				<div className="model-form__error">{errors.homepage}</div>
			</label>

			<button type="submit" className="model-form__submit">
				{mode === "edit" ? "수정" : "저장"}
			</button>
		</form>
	);
}

export default AgencyForm;
