import React from "react";
// import FilterButton from "../FilterButton";
import "./FilterBar.css";

function FilterBar({
	gender,
	setGender,
	agency,
	setAgency,
	agencies,
	height,
	setHeight,
	type,
}) {
	return (
		<div className="filter-bar">
			<div className="filter-group">
				<label className="filter-label">성별</label>
				<select value={gender} onChange={(e) => setGender(e.target.value)}>
					<option value="all">전체</option>
					<option value="male">남성</option>
					<option value="female">여성</option>
				</select>
				<label className="filter-label">에이전시</label>
				<select value={agency} onChange={(e) => setAgency(e.target.value)}>
					<option value="all">전체</option>
					{agencies.map((agencyName) => (
						<option key={agencyName} value={agencyName}>
							{agencyName}
						</option>
					))}
				</select>
			</div>

			<div className="filter-group">
				{type === "models" && (
					<>
						<label className="filter-label">키</label>
						<select value={height} onChange={(e) => setHeight(e.target.value)}>
							<option value="all">전체</option>
							<option value="165-170">165~170</option>
							<option value="171-175">171~175</option>
							<option value="176-180">176~180</option>
							<option value="181-185">181~185</option>
							<option value="186-999">186 이상</option>
						</select>
					</>
				)}
			</div>
		</div>
	);
}

export default FilterBar;
