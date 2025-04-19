import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import "./AgencyListPage.css";

function AgencyListPage() {
	const navigate = useNavigate();
	const { keyword } = useQueryFilters("/agencies");

	const handleClick = (name) => {
		navigate(`/agencies/${encodeURIComponent(name)}`);
	};

	const agencies = useSelector((state) => state.agencies.agencies);
	const filteredAgencies = agencies.filter((agency) =>
		agency.name.toLowerCase().includes(keyword.toLowerCase())
	);

	return (
		<div className="agency-page">
			<h1 className="admin-title">에이전시 리스트</h1>
			{filteredAgencies.length === 0 ? (
				<p>검색 결과가 없습니다.</p>
			) : (
				<ul className="agency-list">
					{filteredAgencies.map((agency) => (
						<li
							key={agency.name}
							className="agency-card"
							onClick={() => handleClick(agency.name)}
						>
							<img
								src={agency.logo}
								alt={`${agency.name} 로고`}
								className="agency-card-logo"
							/>
							<h3>{agency.name}</h3>
							<p className="agency-description">{agency.description}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default AgencyListPage;
