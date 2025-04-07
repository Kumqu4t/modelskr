import React from "react";

function FilterBar({ query, setQuery }) {
	const updateQuery = (key, value) => {
		setQuery((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	return (
		<div className="filter-bar">
			<button onClick={() => updateQuery("gender", "female")}>여성</button>
			<button onClick={() => updateQuery("gender", "male")}>남성</button>
			<button onClick={() => updateQuery("favorite", !query.favorite)}>
				{query.favorite ? "★ 즐겨찾기" : "☆ 즐겨찾기"}
			</button>
		</div>
	);
}
export default FilterBar;
