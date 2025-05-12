import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useSelector } from "react-redux";
import { useFavorites } from "../../hooks/useFavorites";
import { usePeople } from "../../hooks/people/usePeople";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";

function PersonListPage() {
	const { gender, setGender, role, keyword, page, setPage } =
		useQueryFilters("/people");

	const { data, isLoading } = usePeople({
		gender,
		role,
		keyword,
		page,
	});
	const people = data?.people || [];
	const totalCount = data?.totalCount || 0;

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Person");

	if (isLoading) return <Loading />;

	return (
		<>
			<DefaultHelmet
				title="People 리스트"
				description="People 리스트와 필터를 통해 원하는 사람을 찾을 수 있습니다."
			/>
			<div style={{ padding: "24px" }}>
				<h1 className="admin-title">{role[0].toUpperCase() + role.slice(1)}</h1>
				<FilterBar gender={gender} setGender={setGender} type={"people"} />
				<ModelList
					type="people"
					models={people}
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

export default PersonListPage;
