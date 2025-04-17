import React from "react";
import FilterButton from "../FilterButton";
import "./FilterBar.css";

function FilterBar({
	selectedTags,
	setSelectedTags,
	tags,
	gender,
	setGender,
	agency,
	setAgency,
}) {
	const toggleTag = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	const handleGenderChange = (value) => setGender(value); // 단일 선택
	const handleAgencyChange = (value) => setAgency(value); // 단일 선택

	return (
		<div className="filter-bar">
			<p>성별</p>
			<div className="gender-filter">
				<select
					value={gender}
					onChange={(e) => handleGenderChange(e.target.value)}
				>
					<option value="all">전체</option>
					<option value="male">남성</option>
					<option value="female">여성</option>
				</select>
			</div>

			{/* 에이전시 필터 */}
			<p>에이전시</p>
			<div className="agency-filter">
				<select
					value={agency}
					onChange={(e) => handleAgencyChange(e.target.value)}
				>
					<option value="all">전체</option>
					<option value="Agency A">Agency A</option>
					<option value="Agency B">Agency B</option>
				</select>
			</div>

			{/* 태그 필터 */}
			<p>tags</p>
			<div className="tag-filter">
				{tags.map((tag) => (
					<FilterButton
						key={tag}
						active={selectedTags.includes(tag)}
						onClick={() => toggleTag(tag)}
					>
						{tag}
					</FilterButton>
				))}
			</div>
		</div>
	);
}

export default FilterBar;
