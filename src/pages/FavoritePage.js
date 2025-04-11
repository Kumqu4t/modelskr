import React, { useState, useEffect } from "react";
import ModelList from "../components/ModelList";

function FavoritePage({ favorites, setFavorites }) {
	const [models, setModels] = useState([]);

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
			<ModelList
				models={models}
				favorites={favorites}
				setFavorites={setFavorites}
			/>
		</div>
	);
}

export default FavoritePage;
