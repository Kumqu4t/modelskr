import { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../api";
import ModelList from "../../components/ModelList";
import PhotoList from "../../components/PhotoList";
import RequireLogin from "../../components/RequireLogin";
import "./FavoritePage.css";
import { useFavorites } from "../../hooks/useFavorites";
import Loading from "../../components/Loading";
const Pagination = lazy(() => import("../../components/Pagination"));

function FavoritePage() {
	const [models, setModels] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [favoriteType, setFavoriteType] = useState("Model");
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, favoriteType);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let url = "";
				if (favoriteType === "Model") url = `${API_BASE_URL}/api/models`;
				else if (favoriteType === "Person") url = `${API_BASE_URL}/api/people`;
				else if (favoriteType === "Photo") url = `${API_BASE_URL}/api/photos`;

				const res = await fetch(url);
				const data = await res.json();
				setModels(data);
				if (favoriteType === "Model") setModels(data.models || []);
				else if (favoriteType === "Person") setModels(data.people || []);
				else if (favoriteType === "Photo") setModels(data.photos || []);
			} catch (err) {
				console.error(`${favoriteType} 불러오기 실패:`, err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [favoriteType]);

	const handleToggleFavorite = toggleFavorite;

	const safeFavorites = Array.isArray(favorites) ? favorites : [];
	const filteredItems = models.filter((model) =>
		(safeFavorites || []).some((fav) => fav?.item?._id === model._id)
	);

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentItems = filteredItems.slice(startIndex, startIndex + itemLimit);

	if (isLoading) return <Loading />;

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
						className={favoriteType === "Person" ? "active" : ""}
						onClick={() => setFavoriteType("Person")}
					>
						People
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
						type={favoriteType === "Model" ? "models" : "people"}
						models={currentItems}
						favorites={favorites}
						onToggleFavorite={handleToggleFavorite}
					/>
				)}
				<Suspense fallback={<div>페이지네이션 로딩중...</div>}>
					<Pagination
						totalItems={filteredItems.length}
						itemLimit={itemLimit}
						currentPage={currentPage}
						onPageChange={setCurrentPage}
					/>
				</Suspense>
			</div>
		</RequireLogin>
	);
}

export default FavoritePage;
