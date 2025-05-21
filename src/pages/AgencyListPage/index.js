import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useSelector } from "react-redux";
import { useAgencies } from "../../hooks/agencies/useAgencies";
import DefaultHelmet from "../../components/DefaultHelmet";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import "./AgencyListPage.css";
const Pagination = lazy(() => import("../../components/Pagination"));

function AgencyListPage() {
	const navigate = useNavigate();
	const { keyword, page, setPage } = useQueryFilters("/agencies");
	const { data, isLoading } = useAgencies({
		keyword,
		fields: "name,logo,description",
		page,
	});
	const agencies = data?.agencies || [];
	const totalCount = data?.totalCount || 0;
	console.log("data: ", data);

	const isAdmin = useSelector(
		(state) => state.user.user?.email === process.env.REACT_APP_ADMIN_EMAIL
	);

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
				{isAdmin && (
					<div
						style={{
							maxWidth: "1200px",
							margin: "0 auto 16px",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							type="default"
							onClick={() => navigate("/admin/create/agencies")}
						>
							+ 에이전시 추가
						</Button>
					</div>
				)}
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
						<Suspense fallback={<div>페이지네이션 로딩중...</div>}>
							<Pagination
								totalItems={totalCount}
								currentPage={page}
								onPageChange={setPage}
							/>
						</Suspense>
					</>
				)}
			</div>
		</>
	);
}

export default AgencyListPage;
