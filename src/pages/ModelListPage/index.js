import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useFilters } from "../../hooks/useFilters";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";

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
	const [favorites, setFavorites] = useState([]);
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

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

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const res = await fetch("/api/favorites", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				const data = await res.json();
				const ids = data.map((model) => model._id);
				setFavorites(ids);
			} catch (err) {
				console.error("즐겨찾기 데이터를 불러오기 실패:", err);
			}
		};

		if (isLoggedIn) {
			fetchFavorites();
		}
	}, [isLoggedIn]);

	const handleToggleFavorite = async (modelId) => {
		const isFav = favorites.includes(modelId);
		const method = isFav ? "DELETE" : "POST";

		try {
			await fetch(`/api/favorites/${modelId}`, {
				method,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			setFavorites((prev) =>
				isFav ? prev.filter((id) => id !== modelId) : [...prev, modelId]
			);
		} catch (err) {
			console.error("즐겨찾기 변경 실패:", err);
		}
	};

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
				models={currentModels}
				favorites={favorites}
				onToggleFavorite={handleToggleFavorite}
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
