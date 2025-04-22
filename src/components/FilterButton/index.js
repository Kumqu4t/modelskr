import React from "react";
import "./FilterButton.css";

function FilterButton({ active, onClick, children, disabled }) {
	return (
		<button
			className={`filter-button ${active ? "active" : ""} ${
				disabled ? "disabled" : ""
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default FilterButton;
