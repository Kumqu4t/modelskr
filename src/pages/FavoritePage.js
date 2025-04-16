import React from "react";
import { useSelector } from "react-redux";
import ModelList from "../components/ModelList";
import "../styles/FavoritePage.css";

function FavoritePage() {
	const models = useSelector((state) => state.models.models);
	const favorites = useSelector((state) => state.favorites.items); // 🔥 Redux에서 가져옴
	const filteredModels = models.filter((model) => favorites.includes(model.id));

	return (
		<div className="favorite-page">
			<h1>즐겨찾기</h1>
			<ModelList models={filteredModels} />
		</div>
	);
}

export default FavoritePage;
