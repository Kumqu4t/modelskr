import React from "react";
import "./SearchBar.css";

function SearchBar({
	value,
	onChange,
	onSubmit,
	searchTarget,
	setSearchTarget,
}) {
	const [isFocused, setIsFocused] = React.useState(false);

	const handleBlur = (e) => {
		if (e.relatedTarget && e.relatedTarget.tagName === "SELECT") {
			return;
		}
		setIsFocused(false);
	};

	return (
		<form onSubmit={onSubmit} className="search-form">
			<div className="search-wrapper">
				{(value || isFocused) && (
					<select
						className="search-select"
						value={searchTarget}
						onChange={(e) => setSearchTarget(e.target.value)}
					>
						<option value="models">모델</option>
						<option value="people">아티스트</option>
						<option value="agencies">에이전시</option>
						<option value="photos">사진</option>
					</select>
				)}
				<input
					className="search-bar"
					type="text"
					placeholder="종류 선택 및 이름 검색"
					value={value}
					onChange={onChange}
					onFocus={() => setIsFocused(true)}
					onBlur={handleBlur}
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
