import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useFilters } from "../../hooks/useFilters";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";
import { useFavorites } from "../../hooks/useFavorites";

function ModelListPage() {
	const {
		selectedTags,
		setSelectedTags,
		gender,
		setGender,
		agency,
		setAgency,
		keyword,
	} = useQueryFilters("/models");
	const [models, setModels] = useState([]);

	useEffect(() => {
		const fetchModels = async () => {
			try {
				const res = await fetch("/api/models");
				const data = await res.json();
				setModels(data);
			} catch (err) {
				console.error("모델 데이터를 불러오기 실패:", err);
			}
		};

		fetchModels();
	}, []);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Model");

	const filteredModels = useFilters(
		models,
		selectedTags,
		keyword,
		gender,
		agency
	);

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentModels = filteredModels.slice(
		startIndex,
		startIndex + itemLimit
	);

	const tags = [...new Set(models.flatMap((model) => model.tags))];
	const availableTags = new Set(filteredModels.flatMap((model) => model.tags));
	const agencies = [
		...new Set(models.map((model) => model.agency?.name).filter(Boolean)),
	];
	if (models.some((model) => model.agency === null)) {
		agencies.push("무소속");
	}

	return (
		<div style={{ padding: "24px" }}>
			<h1 className="admin-title">Models</h1>
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
				type="models"
				models={currentModels}
				favorites={favorites}
				onToggleFavorite={toggleFavorite}
			/>
			<Pagination
				totalItems={filteredModels.length}
				itemLimit={itemLimit}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}

export default ModelListPage;
