import React from "react";
import "../styles/SearchBar.css";

function SearchBar({ value, onChange }) {
	return (
		<input
			className="search-bar"
			type="text"
			placeholder="모델 이름 검색"
			value={value}
			onChange={onChange}
		/>
	);
}

export default SearchBar;
