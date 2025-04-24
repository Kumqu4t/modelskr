import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useFilters } from "../../hooks/useFilters";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";
import { useFavorites } from "../../hooks/useFavorites";

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
	const [photographers, setPhotographers] = useState([]);

	useEffect(() => {
		const fetchPhotographers = async () => {
			try {
				const res = await fetch("/api/photographers");
				const data = await res.json();
				setPhotographers(data);
			} catch (err) {
				console.error("작가 데이터를 불러오기 실패:", err);
			}
		};

		fetchPhotographers();
	}, []);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(
		isLoggedIn,
		"Photographer"
	);

	const filteredPhotographers = useFilters(
		photographers,
		selectedTags,
		keyword,
		gender,
		agency
	);

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentPhotographers = filteredPhotographers.slice(
		startIndex,
		startIndex + itemLimit
	);

	const tags = [
		...new Set(photographers.flatMap((photographers) => photographers.tags)),
	];
	const availableTags = new Set(
		filteredPhotographers.flatMap((photographers) => photographers.tags)
	);
	const agencies = [
		...new Set(
			photographers
				.map((photographers) => photographers.agency?.name)
				.filter(Boolean)
		),
	];

	return (
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
				totalItems={filteredPhotographers.length}
				itemLimit={itemLimit}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}

export default PhotographerListPage;
