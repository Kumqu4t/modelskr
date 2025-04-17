import React from "react";
import "./FilterButton.css";

function FilterButton({ active, onClick, children }) {
	return (
		<button
			className={`filter-button ${active ? "active" : ""}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default FilterButton;
