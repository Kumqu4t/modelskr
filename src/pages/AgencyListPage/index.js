import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { useNavigate } from "react-router-dom";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import "./AgencyListPage.css";

function AgencyListPage() {
	const [agencies, setAgencies] = useState([]);
	const [loading, setLoading] = useState(true);
	const { keyword } = useQueryFilters("/agencies");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/api/agencies`);
				setAgencies(res.data);
			} catch (err) {
				console.error("에이전시 목록 가져오기 실패", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredAgencies = agencies.filter((agency) =>
		agency.name?.toLowerCase().includes(keyword.toLowerCase())
	);

	const handleClick = (id) => {
		navigate(`/agencies/${id}`);
	};

	if (loading) return <p>로딩 중...</p>;

	return (
		<div className="agency-page">
			<h1 className="admin-title">에이전시 리스트</h1>
			{filteredAgencies.length === 0 ? (
				<p>검색 결과가 없습니다.</p>
			) : (
				<ul className="agency-list">
					{filteredAgencies.map((agency) => (
						<li
							key={agency._id}
							className="agency-card"
							onClick={() => handleClick(agency._id)}
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
