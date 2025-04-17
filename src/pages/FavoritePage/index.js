import React from "react";
import { useSelector } from "react-redux";
import ModelList from "../../components/ModelList";
import RequireLogin from "../../components/RequireLogin";
import "./FavoritePage.css";

function FavoritePage() {
	const models = useSelector((state) => state.models.models);
	const favorites = useSelector((state) => state.favorites.items); // 🔥 Redux에서 가져옴
	const filteredModels = models.filter((model) => favorites.includes(model.id));

	return (
		<RequireLogin>
			<div className="favorite-page">
				<h1 className="admin-title">Favorites</h1>
				<ModelList models={filteredModels} />
			</div>
		</RequireLogin>
	);
}

export default FavoritePage;
