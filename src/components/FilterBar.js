import React from "react";
import FilterButton from "./FilterButton";
import "../styles/FilterBar.css";

function FilterBar({ selectedTags, setSelectedTags, tags }) {
	const toggleTag = (tag) => {
		setSelectedTags(
			(prev) =>
				prev.includes(tag)
					? prev.filter((t) => t !== tag) // 이미 있으면 제거
					: [...prev, tag] // 없으면 추가
		);
	};

	return (
		<div className="filter-bar">
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
	);
}

export default FilterBar;
