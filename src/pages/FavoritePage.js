// src/pages/FavoritePage.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModelList from "../components/ModelList";

function FavoritePage() {
	const [models, setModels] = useState([]);
	const favorites = useSelector((state) => state.favorites.items); // 🔥 Redux에서 가져옴

	useEffect(() => {
		fetch("/mock/models.json")
			.then((res) => res.json())
			.then((data) => {
				const favModels = data.filter((model) => favorites.includes(model.id));
				setModels(favModels);
			});
	}, [favorites]);

	return (
		<div>
			<h1>즐겨찾기</h1>
			<ModelList models={models} />
		</div>
	);
}

export default FavoritePage;
