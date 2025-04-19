import { useState } from "react";
import { useSelector } from "react-redux";
import ModelList from "../../components/ModelList";
import RequireLogin from "../../components/RequireLogin";
import "./FavoritePage.css";
import Pagination from "../../components/Pagination";

function FavoritePage() {
	const models = useSelector((state) => state.models.models);
	const favorites = useSelector((state) => state.favorites.items); // 🔥 Redux에서 가져옴
	const filteredModels = models.filter((model) => favorites.includes(model.id));

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
				<ModelList models={currentModels} />
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
