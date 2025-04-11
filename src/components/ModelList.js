import React from "react";
import ModelCard from "./ModelCard";
import "../styles/ModelList.css";

function ModelList({ models, favorites, setFavorites }) {
	return (
		<div className="model-card-container">
			{models.map((model) => (
				<ModelCard
					key={model.id}
					id={model.id}
					image={model.image}
					name={model.name}
					description={model.description}
					favorites={favorites}
					setFavorites={setFavorites}
				/>
			))}
		</div>
	);
}

export default ModelList;
