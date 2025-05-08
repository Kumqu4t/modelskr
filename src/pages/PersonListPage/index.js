import { useState } from "react";
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
	const { gender, setGender, role, setRole, keyword } =
		useQueryFilters("/people");

	const { data: people = [], isLoading } = usePeople({
		gender,
		role,
		keyword,
	});

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Person");

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentPeople = people.slice(startIndex, startIndex + itemLimit);

	if (isLoading) return <Loading />;

	return (
		<>
			<DefaultHelmet
				title="People 리스트"
				description="People 리스트와 필터를 통해 원하는 사람을 찾을 수 있습니다."
			/>
			<div style={{ padding: "24px" }}>
				<h1 className="admin-title">People</h1>
				<FilterBar
					gender={gender}
					setGender={setGender}
					role={role}
					setRole={setRole}
					type={"people"}
				/>
				<ModelList
					type="people"
					models={currentPeople}
					favorites={favorites}
					onToggleFavorite={toggleFavorite}
				/>
				<Pagination
					totalItems={people.length}
					itemLimit={itemLimit}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</>
	);
}

export default PersonListPage;
