import React, { useState, useEffect } from "react";
import { useModels } from "../../hooks/models/useModels";
import { usePhotographers } from "../../hooks/photographers/usePhotographers";
import { useUpload } from "../../hooks/useUpload";
import { useRemoveImage } from "../../hooks/useRemoveImage";
import "./PhotoForm.css";

function PhotoForm({ mode, photo, onSubmit }) {
	const [formData, setFormData] = useState({
		title: "",
		images: [],
		description: "",
		tags: "",
		category: "",
		models: [],
		photographers: [],
	});

	const [errors, setErrors] = useState({
		title: "",
		images: [],
	});

	const { data: models = [] } = useModels({});
	const { data: photographers = [] } = usePhotographers({});
	const { mutate: uploadImage, isLoading: isUploading } = useUpload();
	const { mutate: removeImage } = useRemoveImage();

	const [modelSearchTerm, setModelSearchTerm] = useState("");
	const [photographerSearchTerm, setPhotographerSearchTerm] = useState("");
	const [modelSearchResults, setModelSearchResults] = useState([]);
	const [photographerSearchResults, setPhotographerSearchResults] = useState(
		[]
	);

	useEffect(() => {
		console.log("mode, photo: ", mode, photo);
		if (mode === "edit" && photo) {
			console.log("editing photo: ", photo);
			setFormData({
				...photo,
				images: photo.images || [],
				tags: photo.tags?.join(", ") || "",
				models: photo.models?.map((m) => m._id) || [],
				photographers: photo.photographers?.map((p) => p._id) || [],
				category: photo.category || "",
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
		if (!formData.images) formErrors.images = "이미지를 업로드해주세요.";

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		const imagesArray = formData.images;

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

	const handlePhotoUpload = (e) => {
		const files = Array.from(e.target.files);
		if (files.length > 0) {
			files.forEach((file) => {
				uploadImage(file, {
					onSuccess: (data) => {
						setFormData((prev) => ({
							...prev,
							images: [
								...prev.images,
								{
									url: data.url,
									public_id: data.public_id,
								},
							],
						}));
					},
					onError: (error) => {
						console.error("사진 업로드 실패:", error);
						setErrors((prev) => ({
							...prev,
							images: "사진 업로드에 실패했습니다. 다시 시도해주세요.",
						}));
					},
				});
			});
		}
	};

	const handleRemovePhoto = (public_id) => {
		removeImage(public_id, {
			onSuccess: (data) => {
				console.log("삭제 성공:", data);
				setFormData((prevData) => ({
					...prevData,
					images: prevData.images.filter((img) => img.public_id !== public_id),
				}));
				console.log("삭제 후 images: ", formData.images);
			},
			onError: (error) => {
				console.error("삭제 실패:", error);
			},
		});
	};

	const addModel = (model) => {
		if (!formData.models.includes(model._id)) {
			setFormData((prev) => ({
				...prev,
				models: [...prev.models, model._id],
			}));
		}
	};

	const removeModel = (modelId, e) => {
		e.stopPropagation();
		setFormData((prev) => ({
			...prev,
			models: prev.models.filter((id) => id !== modelId),
		}));
	};

	const addPhotographer = (photographer) => {
		if (!formData.photographers.includes(photographer._id)) {
			setFormData((prev) => ({
				...prev,
				photographers: [...prev.photographers, photographer._id],
			}));
		}
	};

	const removePhotographer = (photographerId, e) => {
		e.stopPropagation();
		setFormData((prev) => ({
			...prev,
			photographers: prev.photographers.filter((id) => id !== photographerId),
		}));
	};

	const getModelNameById = (id) => {
		const model = models.find((m) => m._id === id);
		return model ? model.name : id;
	};

	const getPhotographerNameById = (id) => {
		const photographer = photographers.find((p) => p._id === id);
		return photographer ? photographer.name : id;
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
					사진 업로드 <span className="photo-form__required">*</span>
				</span>
				<input
					className="photo-form__input"
					type="file"
					name="images"
					onChange={handlePhotoUpload}
					accept="image/*"
					multiple
					aria-describedby="imagesError"
				/>
				{isUploading && <span>업로드 중...</span>}
				{formData.images.length > 0 && (
					<div className="photo-form__photos-preview">
						{formData.images.map((image, index) => (
							<div key={index} className="photo-form__photo">
								<img
									src={image.url}
									alt={`${index + 1}`}
									style={{ maxWidth: "100px", marginRight: "10px" }}
								/>
								<button
									type="button"
									onClick={() => handleRemovePhoto(image.public_id)}
									className="photo-form__remove-photo-btn"
								>
									제거
								</button>
							</div>
						))}
					</div>
				)}
				<div id="imagesError" className="photo-form__error">
					{errors.images}
				</div>
			</label>

			<label className="photo-form__field">
				<span className="photo-form__label">
					카테고리 <span className="photo-form__required">*</span>
				</span>
				<select
					className="photo-form__input"
					name="category"
					value={formData.category}
					onChange={handleChange}
					required
				>
					<option value="" disabled>
						카테고리를 선택하세요
					</option>
					<option value="commercial">Commercial</option>
					<option value="editorial">Editorial</option>
					<option value="others">Others</option>
				</select>
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

			{/* 모델 검색 및 선택 */}
			<div className="photo-form__field">
				<label className="photo-form__label">모델 검색 및 선택</label>

				{/* 모델 검색 바 */}
				<div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
					<input
						className="photo-form__input"
						type="text"
						value={modelSearchTerm}
						onChange={(e) => {
							setModelSearchTerm(e.target.value);
							const results = models.filter((model) =>
								model.name.toLowerCase().includes(e.target.value.toLowerCase())
							);
							setModelSearchResults(results);
						}}
						placeholder="모델 이름 검색"
					/>
				</div>

				{/* 선택된 모델 리스트 */}
				{formData.models.length > 0 && (
					<div
						className="photo-form__selected-list"
						style={{ marginBottom: "8px" }}
					>
						<p>선택된 모델:</p>
						<ul style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
							{formData.models.map((modelId) => (
								<li key={modelId}>
									{getModelNameById(modelId)}{" "}
									<button
										type="button"
										onClick={(e) => removeModel(modelId, e)}
										aria-label={`Remove model ${getModelNameById(modelId)}`}
									>
										X
									</button>
								</li>
							))}
						</ul>
					</div>
				)}

				{/* 모델 검색 결과 */}
				<div className="photo-form__search-results">
					{modelSearchResults.length > 0 ? (
						<ul>
							{modelSearchResults.map((model) => (
								<li key={model._id}>
									<button
										type="button"
										onClick={() => addModel(model)}
										style={{ cursor: "pointer" }}
									>
										{model.name}
									</button>
								</li>
							))}
						</ul>
					) : (
						<p>검색 결과가 없습니다.</p>
					)}
				</div>
			</div>

			{/* 포토그래퍼 검색 및 선택 */}
			<div className="photo-form__field">
				<label className="photo-form__label">포토그래퍼 검색 및 선택</label>

				{/* 포토그래퍼 검색 바 */}
				<div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
					<input
						className="photo-form__input"
						type="text"
						value={photographerSearchTerm}
						onChange={(e) => {
							setPhotographerSearchTerm(e.target.value);
							const results = photographers.filter((photographer) =>
								photographer.name
									.toLowerCase()
									.includes(e.target.value.toLowerCase())
							);
							setPhotographerSearchResults(results);
						}}
						placeholder="포토그래퍼 이름 검색"
					/>
				</div>

				{/* 선택된 포토그래퍼 리스트 */}
				{formData.photographers.length > 0 && (
					<div
						className="photo-form__selected-list"
						style={{ marginBottom: "8px" }}
					>
						<p>선택된 포토그래퍼:</p>
						<ul style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
							{formData.photographers.map((photographerId) => (
								<li key={photographerId}>
									{getPhotographerNameById(photographerId)}{" "}
									<button
										type="button"
										onClick={(e) => removePhotographer(photographerId, e)}
										aria-label={`Remove photographer ${getPhotographerNameById(
											photographerId
										)}`}
									>
										X
									</button>
								</li>
							))}
						</ul>
					</div>
				)}

				{/* 포토그래퍼 검색 결과 */}
				<div className="photo-form__search-results">
					{photographerSearchResults.length > 0 ? (
						<ul>
							{photographerSearchResults.map((photographer) => (
								<li key={photographer._id}>
									<button
										type="button"
										onClick={() => addPhotographer(photographer)}
										style={{ cursor: "pointer" }}
									>
										{photographer.name}
									</button>
								</li>
							))}
						</ul>
					) : (
						<p>검색 결과가 없습니다.</p>
					)}
				</div>
			</div>

			<button type="submit" className="photo-form__submit">
				{mode === "edit" ? "수정" : "저장"}
			</button>
		</form>
	);
}

export default PhotoForm;
