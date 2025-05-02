import React, { useState, useEffect } from "react";
import "./PeopleForm.css";

function PeopleForm({ mode, item, onSubmit, agencies, roll }) {
	const [formData, setFormData] = useState({
		name: "",
		image: "",
		description: "",
		gender: "",
		agency: "",
		tags: "",
		recentWork: "",
		contact: "",
		birthYear: "",
		nationality: "",
		height: "",
		measurements: { chest: "", waist: "", hips: "" },
		shoeSize: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		gender: "",
	});

	const [agencySearchTerm, setAgencySearchTerm] = useState("");
	const [agencySearchResults, setAgencySearchResults] = useState([]);

	const addAgency = (agency) => {
		setFormData((prev) => ({
			...prev,
			agency: agency._id,
		}));
	};

	const removeAgency = (agencyId, e) => {
		e.stopPropagation();
		setFormData((prev) => ({
			...prev,
			agency: null,
		}));
	};

	const getAgencyNameById = (id) => {
		const agency = agencies.find((a) => a._id === id);
		return agency ? agency.name : id;
	};

	useEffect(() => {
		if (mode === "edit" && item) {
			setFormData({
				...item,
				gender: item.gender || "",
				agency: item.agency?._id || "",
				tags: item.tags?.join(", ") || "",
				recentWork:
					item.recentWork
						?.map((work) => `${work.type}:${work.title}:${work.link}`)
						.join(", ") || "",
				contact: item.contact || "",
				birthYear: item.birthYear || "",
				nationality: item.nationality || "",
				height: item.height || "",
				measurements: item.measurements || { chest: "", waist: "", hips: "" },
				shoeSize: item.shoeSize || "",
			});
		}
	}, [mode, item, roll]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name.startsWith("measurements.")) {
			const key = name.split(".")[1];
			setFormData((prev) => ({
				...prev,
				measurements: {
					...prev.measurements,
					[key]: value,
				},
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
		if (!formData.name) formErrors.name = "이름을 입력해주세요.";
		if (!formData.gender) formErrors.gender = "성별을 선택해주세요.";

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		const filteredFormData = { ...formData };
		if (roll !== "model") {
			delete filteredFormData.height;
			delete filteredFormData.measurements;
			delete filteredFormData.shoeSize;
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
			agency: formData.agency || null,
			tags: tagsArray,
			recentWork: recentWorkArray,
		};
		onSubmit(processedData);
	};

	return (
		<form onSubmit={handleSubmit} className="model-form">
			<h2 className="model-form__title">
				{mode === "edit"
					? `${roll === "model" ? "모델 수정" : "포토그래퍼 수정"}`
					: `${roll === "model" ? "모델 추가" : "포토그래퍼 추가"}`}
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
				<span className="model-form__label">에이전시</span>
				<div>
					<input
						className="model-form__input"
						type="text"
						value={agencySearchTerm}
						onChange={(e) => {
							setAgencySearchTerm(e.target.value);
							const results = agencies.filter((agency) =>
								agency.name
									.toLowerCase()
									.includes(agencySearchTerm.toLowerCase())
							);
							setAgencySearchResults(results);
						}}
						placeholder="에이전시 이름 검색"
					/>
				</div>

				{agencySearchResults.length > 0 && (
					<div className="photo-form__search-results">
						<ul>
							{agencySearchResults.map((agency) => (
								<li key={agency._id}>
									<button
										type="button"
										onClick={() => addAgency(agency)}
										style={{ cursor: "pointer" }}
									>
										{agency.name}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}

				{formData.agency && (
					<div className="photo-form__selected-list">
						<p>선택된 에이전시:</p>
						<ul>
							<li>
								{getAgencyNameById(formData.agency)}{" "}
								<button
									type="button"
									onClick={(e) => removeAgency(formData.agency, e)}
									aria-label="Remove agency"
								>
									X
								</button>
							</li>
						</ul>
					</div>
				)}
			</label>

			<label className="model-form__field">
				<span className="model-form__label">출생년도</span>
				<input
					className="model-form__input"
					type="number"
					name="birthYear"
					value={formData.birthYear}
					onChange={handleChange}
					min="1900"
					max={new Date().getFullYear()}
				/>
			</label>

			<label className="model-form__field">
				<span className="model-form__label">국적</span>
				<input
					className="model-form__input"
					type="text"
					name="nationality"
					value={formData.nationality}
					onChange={handleChange}
				/>
			</label>

			{/* 모델일 때만 표시되는 필드 */}
			{roll === "model" && (
				<>
					<label className="model-form__field">
						<span className="model-form__label">키 (cm)</span>
						<input
							className="model-form__input"
							type="number"
							name="height"
							value={formData.height}
							onChange={handleChange}
						/>
					</label>

					<label className="model-form__field">
						<span className="model-form__label">가슴 사이즈</span>
						<input
							className="model-form__input"
							type="number"
							name="measurements.chest"
							value={formData.measurements.chest}
							onChange={handleChange}
						/>
					</label>

					<label className="model-form__field">
						<span className="model-form__label">허리 사이즈</span>
						<input
							className="model-form__input"
							type="number"
							name="measurements.waist"
							value={formData.measurements.waist}
							onChange={handleChange}
						/>
					</label>

					<label className="model-form__field">
						<span className="model-form__label">엉덩이 사이즈</span>
						<input
							className="model-form__input"
							type="number"
							name="measurements.hips"
							value={formData.measurements.hips}
							onChange={handleChange}
						/>
					</label>

					<label className="model-form__field">
						<span className="model-form__label">신발 사이즈</span>
						<input
							className="model-form__input"
							type="number"
							name="shoeSize"
							value={formData.shoeSize}
							onChange={handleChange}
						/>
					</label>
				</>
			)}

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

export default PeopleForm;
