import React from "react";
// import FilterButton from "../FilterButton";
import "./FilterBar.css";

function FilterBar({
	gender,
	setGender,
	agency,
	setAgency,
	agencies,
	role,
	setRole,
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
			</div>

			<div className="filter-group">
				{type === "people" && (
					<>
						<label className="filter-label">직업</label>
						<select value={role} onChange={(e) => setRole(e.target.value)}>
							<option value="all">전체</option>
							<option value="photographer">포토그래퍼</option>
							<option value="hair">헤어</option>
							<option value="makeup">메이크업</option>
						</select>
					</>
				)}
				{type === "models" && (
					<>
						<label className="filter-label">에이전시</label>
						<select value={agency} onChange={(e) => setAgency(e.target.value)}>
							<option value="all">전체</option>
							{agencies.map((agencyName) => (
								<option key={agencyName} value={agencyName}>
									{agencyName}
								</option>
							))}
						</select>
					</>
				)}
			</div>
		</div>
	);
}

export default FilterBar;
