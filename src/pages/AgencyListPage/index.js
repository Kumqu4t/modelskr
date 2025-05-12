import { useNavigate } from "react-router-dom";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useAgencies } from "../../hooks/agencies/useAgencies";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import "./AgencyListPage.css";
import DefaultHelmet from "../../components/DefaultHelmet";

function AgencyListPage() {
	const { keyword, page, setPage } = useQueryFilters("/agencies");
	const { data, isLoading } = useAgencies({
		keyword,
		fields: "name logo description",
		page,
	});
	const agencies = data?.agencies || [];
	const totalCount = data?.totalCount || 0;
	const navigate = useNavigate();

	const handleClick = (id) => {
		navigate(`/agencies/${id}`);
	};

	if (isLoading) return <Loading />;

	return (
		<>
			<DefaultHelmet
				title="에이전시 리스트"
				description="한국의 다양한 모델 에이전시 목록을 확인해보세요."
			/>
			<div className="agency-page">
				<h1 className="admin-title">에이전시 리스트</h1>
				{agencies.length === 0 ? (
					<p>검색 결과가 없습니다.</p>
				) : (
					<>
						<ul className="agency-list">
							{agencies.map((agency) => (
								<li
									key={agency._id}
									className="agency-card"
									onClick={() => handleClick(agency._id)}
								>
									<img
										src={agency.logo?.url}
										alt={`${agency.name} 로고`}
										className="agency-card-logo"
									/>
									<h3>{agency.name}</h3>
									<p className="agency-description">{agency.description}</p>
								</li>
							))}
						</ul>
						<Pagination
							totalItems={totalCount}
							currentPage={page}
							onPageChange={setPage}
						/>
					</>
				)}
			</div>
		</>
	);
}

export default AgencyListPage;
