import { useState } from "react";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useSelector } from "react-redux";
import { useFavorites } from "../../hooks/useFavorites";
import { usePhotographers } from "../../hooks/photographers/usePhotographers";
import { useAgencies } from "../../hooks/agencies/useAgencies";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";

function PhotographerListPage() {
	const {
		selectedTags,
		setSelectedTags,
		gender,
		setGender,
		agency,
		setAgency,
		keyword,
	} = useQueryFilters("/photographers");

	const { data: photographers = [], isLoading } = usePhotographers({
		gender,
		agency,
		selectedTags,
		keyword,
	});

	const { data: rawAgencies = [] } = useAgencies({ fields: "name" });
	const agencies = [...rawAgencies.map((a) => a.name), "무소속"];

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(
		isLoggedIn,
		"Photographer"
	);

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentPhotographers = photographers.slice(
		startIndex,
		startIndex + itemLimit
	);

	const tags = [
		...new Set(photographers.flatMap((photographers) => photographers.tags)),
	];
	const availableTags = new Set(
		photographers.flatMap((photographers) => photographers.tags)
	);

	if (isLoading) return <Loading />;

	return (
		<>
			<DefaultHelmet
				title="포토그래퍼 리스트"
				description="포토그래퍼 리스트와 필터를 통해 원하는 포토그래퍼를 찾을 수 있습니다."
			/>
			<div style={{ padding: "24px" }}>
				<h1 className="admin-title">Photographers</h1>
				<FilterBar
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
					tags={tags}
					availableTags={availableTags}
					gender={gender}
					setGender={setGender}
					agency={agency}
					setAgency={setAgency}
					agencies={agencies}
				/>
				<ModelList
					type="photographers"
					models={currentPhotographers}
					favorites={favorites}
					onToggleFavorite={toggleFavorite}
				/>
				<Pagination
					totalItems={photographers.length}
					itemLimit={itemLimit}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</>
	);
}

export default PhotographerListPage;
