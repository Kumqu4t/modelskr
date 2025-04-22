import { useState, useEffect } from "react";
import ModelList from "../../components/ModelList";
import RequireLogin from "../../components/RequireLogin";
import "./FavoritePage.css";
import Pagination from "../../components/Pagination";

function FavoritePage() {
	const [models, setModels] = useState([]);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const fetchModels = async () => {
			try {
				const res = await fetch("/api/models");
				const data = await res.json();
				setModels(data);
			} catch (err) {
				console.error("모델 불러오기 실패:", err);
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
				const favoriteIds = data.map((model) => model._id);
				setFavorites(favoriteIds);
			} catch (error) {
				console.error("즐겨찾기 불러오기 실패:", error);
			}
		};

		fetchFavorites();
	}, []);

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

	const filteredModels = models.filter((model) =>
		favorites.includes(model._id)
	);

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentModels = filteredModels.slice(
		startIndex,
		startIndex + itemLimit
	);

	return (
		<RequireLogin>
			<div className="favorite-page">
				<h1 className="admin-title">Favorites</h1>
				<ModelList
					models={currentModels}
					favorites={favorites}
					onToggleFavorite={handleToggleFavorite}
				/>{" "}
				<Pagination
					totalItems={filteredModels.length}
					itemLimit={itemLimit}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</RequireLogin>
	);
}

export default FavoritePage;
