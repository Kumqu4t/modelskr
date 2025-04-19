import React, { useState } from "react";
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
	const [showAllTags, setShowAllTags] = useState(false);

	const toggleTag = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	return (
		<div className="filter-bar">
			<div className="filter-group">
				<label className="filter-label">성별</label>
				<select value={gender} onChange={(e) => setGender(e.target.value)}>
					<option value="all">전체</option>
					<option value="male">남성</option>
					<option value="female">여성</option>
				</select>
			</div>

			<div className="filter-group">
				<label className="filter-label">에이전시</label>
				<select value={agency} onChange={(e) => setAgency(e.target.value)}>
					<option value="all">전체</option>
					<option value="Agency A">Agency A</option>
					<option value="Agency B">Agency B</option>
				</select>
			</div>

			<div className="filter-group">
				<label className="filter-label">태그</label>
				<div className="tag-filter">
					{tags.slice(0, showAllTags ? tags.length : 5).map((tag) => (
						<FilterButton
							key={tag}
							active={selectedTags.includes(tag)}
							onClick={() => toggleTag(tag)}
						>
							{tag}
						</FilterButton>
					))}
					{tags.length > 5 && (
						<button
							className="toggle-tags-button"
							onClick={() => setShowAllTags((prev) => !prev)}
						>
							{showAllTags ? "◀ 접기" : "펼치기 ▶"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default FilterBar;
