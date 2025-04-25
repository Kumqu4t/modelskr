import { useState, useEffect } from "react";
import ModelList from "../../components/ModelList";
import PhotoList from "../../components/PhotoList";
import RequireLogin from "../../components/RequireLogin";
import "./FavoritePage.css";
import Pagination from "../../components/Pagination";
import { useFavorites } from "../../hooks/useFavorites";

function FavoritePage() {
	const [models, setModels] = useState([]);
	const [favoriteType, setFavoriteType] = useState("Model");
	const { favorites, toggleFavorite } = useFavorites(true, favoriteType);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let url = "";
				if (favoriteType === "Model") url = "/api/models";
				else if (favoriteType === "Photographer") url = "/api/photographers";
				else if (favoriteType === "Photo") url = "/api/photos";

				const res = await fetch(url);
				const data = await res.json();
				setModels(data);
			} catch (err) {
				console.error(`${favoriteType} 불러오기 실패:`, err);
			}
		};

		fetchData();
	}, [favoriteType]);

	const handleToggleFavorite = toggleFavorite;

	const filteredItems = models.filter((model) =>
		favorites.some((fav) => fav.item._id === model._id)
	);

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentItems = filteredItems.slice(startIndex, startIndex + itemLimit);

	return (
		<RequireLogin>
			<div className="favorite-page">
				<h1 className="admin-title">Favorites</h1>
				<div className="favorite-type-buttons">
					<button
						className={favoriteType === "Model" ? "active" : ""}
						onClick={() => setFavoriteType("Model")}
					>
						Models
					</button>
					<button
						className={favoriteType === "Photographer" ? "active" : ""}
						onClick={() => setFavoriteType("Photographer")}
					>
						Photographers
					</button>
					<button
						className={favoriteType === "Photo" ? "active" : ""}
						onClick={() => setFavoriteType("Photo")}
					>
						Photos
					</button>
				</div>
				{favoriteType === "Photo" ? (
					<PhotoList photos={currentItems} />
				) : (
					<ModelList
						type={favoriteType === "Model" ? "models" : "photographers"}
						models={currentItems}
						favorites={favorites}
						onToggleFavorite={handleToggleFavorite}
					/>
				)}
				<Pagination
					totalItems={filteredItems.length}
					itemLimit={itemLimit}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</RequireLogin>
	);
}

export default FavoritePage;
