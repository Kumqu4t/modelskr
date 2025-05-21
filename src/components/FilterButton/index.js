import "./FilterButton.css";

function FilterButton({ active = "", onClick, children, disabled = "" }) {
	return (
		<button
			className={`filter-button ${active} ${disabled}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default FilterButton;
