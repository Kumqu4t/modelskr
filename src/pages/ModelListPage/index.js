import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useSelector } from "react-redux";
import { useModels } from "../../hooks/models";
import { useFavorites } from "../../hooks/useFavorites";
import { useAgencies } from "../../hooks/agencies/useAgencies";
import ModelList from "../../components/ModelList";
import DefaultHelmet from "../../components/DefaultHelmet";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
const FilterBar = lazy(() => import("../../components/FilterBar"));
const Pagination = lazy(() => import("../../components/Pagination"));

function ModelListPage() {
	const navigate = useNavigate();
	const {
		gender,
		setGender,
		agency,
		setAgency,
		height,
		setHeight,
		keyword,
		page,
		setPage,
	} = useQueryFilters("/models");

	const { data, isLoading } = useModels({
		gender,
		agency,
		height,
		keyword,
		page: page,
	});
	const models = data?.models || [];
	const totalCount = data?.totalCount || 0;

	const { data: agenciesData } = useAgencies({
		fields: "name",
		limit: 9999,
	});
	const rawAgencies = agenciesData?.agencies || [];
	const agencies = [...rawAgencies.map((a) => a.name), "무소속"];

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const isAdmin = useSelector(
		(state) => state.user.user?.email === process.env.REACT_APP_ADMIN_EMAIL
	);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Model");

	if (isLoading) return <Loading />;

	return (
		<>
			<DefaultHelmet
				title="모델 리스트"
				description="모델 리스트와 필터를 통해 원하는 모델을 찾을 수 있습니다."
			/>
			<div style={{ padding: "24px" }}>
				<h1 className="admin-title">Models</h1>
				<Suspense fallback={<div>필터 로딩중...</div>}>
					<FilterBar
						gender={gender}
						setGender={setGender}
						agency={agency}
						setAgency={setAgency}
						agencies={agencies}
						height={height}
						setHeight={setHeight}
						type={"models"}
					/>
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
								onClick={() => navigate("/admin/create/models")}
							>
								+ 모델 추가
							</Button>
						</div>
					)}
				</Suspense>
				<ModelList
					type="models"
					models={models}
					favorites={favorites}
					onToggleFavorite={toggleFavorite}
				/>
				<Suspense fallback={<div>페이지네이션 로딩중...</div>}>
					<Pagination
						totalItems={totalCount}
						currentPage={page}
						onPageChange={setPage}
					/>
				</Suspense>
			</div>
		</>
	);
}

export default ModelListPage;
