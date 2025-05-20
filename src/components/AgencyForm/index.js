import React, { useEffect, useState } from "react";
import { useUpload } from "../../hooks/useUpload";
import { useRemoveImage } from "../../hooks/useRemoveImage";
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

	const { mutate: uploadImage, isLoading: isUploading } = useUpload();
	const { mutate: removeImage } = useRemoveImage();

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
		if (!formData.logo) formErrors.logo = "로고를 업로드해주세요.";
		if (!formData.homepage)
			formErrors.homepage = "홈페이지 주소를 입력해주세요.";

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		onSubmit(formData);
	};

	const handleLogoUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			uploadImage([file], {
				onSuccess: (data) => {
					const image = data.images[0];
					setFormData((prev) => ({
						...prev,
						logo: {
							url: image.url,
							public_id: image.public_id,
						},
					}));
				},
				onError: (error) => {
					console.error("로고 업로드 실패:", error);
					setErrors((prev) => ({
						...prev,
						logo: "로고 업로드에 실패했습니다. 다시 시도해주세요.",
					}));
				},
			});
		}
	};

	const handleRemoveLogo = () => {
		if (formData.logo?.public_id) {
			removeImage(formData.logo.public_id, {
				onSuccess: () => {
					setFormData((prev) => ({
						...prev,
						logo: { url: "", public_id: "" },
					}));
				},
				onError: (err) => {
					console.error("로고 삭제 실패:", err);
				},
			});
		}
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
					className="agency-form__input"
					type="file"
					name="logo"
					onChange={handleLogoUpload}
					accept="image/*"
					required
				/>
				{isUploading && <span>업로드 중...</span>}
				{formData.logo && (
					<div>
						<img
							src={formData.logo.url}
							alt="Uploaded Logo"
							style={{ maxWidth: "100%", marginTop: "10px" }}
						/>
						<button type="button" onClick={handleRemoveLogo}>
							삭제
						</button>
					</div>
				)}
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
