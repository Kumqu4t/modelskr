import React from "react";
import "../styles/SearchBar.css";

function SearchBar({ value, onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit} className="search-form">
			<div className="search-wrapper">
				<input
					className="search-bar"
					type="text"
					placeholder="모델 이름 검색"
					value={value}
					onChange={onChange}
				/>
				{value && (
					<button
						type="button"
						className="clear-button"
						onClick={() => onChange({ target: { value: "" } })}
					>
						✕
					</button>
				)}
			</div>
		</form>
	);
}

export default SearchBar;
