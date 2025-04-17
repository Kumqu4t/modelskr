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

	const handleGenderChange = (value) => setGender(value);
	const handleAgencyChange = (value) => setAgency(value);

	return (
		<div className="filter-bar">
			<div className="filter-group">
				<label className="filter-label">성별</label>
				<select
					value={gender}
					onChange={(e) => handleGenderChange(e.target.value)}
				>
					<option value="all">전체</option>
					<option value="male">남성</option>
					<option value="female">여성</option>
				</select>
			</div>

			<div className="filter-group">
				<label className="filter-label">에이전시</label>
				<select
					value={agency}
					onChange={(e) => handleAgencyChange(e.target.value)}
				>
					<option value="all">전체</option>
					<option value="Agency A">Agency A</option>
					<option value="Agency B">Agency B</option>
				</select>
			</div>

			<div className="filter-group">
				<label className="filter-label">태그</label>
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
		</div>
	);
}

export default FilterBar;
