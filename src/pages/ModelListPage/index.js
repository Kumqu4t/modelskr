import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useSelector } from "react-redux";
import { useModels } from "../../hooks/models";
import { useFavorites } from "../../hooks/useFavorites";
import { useAgencies } from "../../hooks/agencies/useAgencies";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";

function ModelListPage() {
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
				<ModelList
					type="models"
					models={models}
					favorites={favorites}
					onToggleFavorite={toggleFavorite}
				/>
				<Pagination
					totalItems={totalCount}
					currentPage={page}
					onPageChange={setPage}
				/>
			</div>
		</>
	);
}

export default ModelListPage;
