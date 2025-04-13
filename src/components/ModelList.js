import React from "react";
import ModelCard from "./ModelCard";
import "../styles/ModelList.css";

function ModelList({ models, favorites, setFavorites }) {
	if (models.length === 0) {
		return (
			<div
				style={{
					height: "70vh",
					textAlign: "center",
					marginTop: "40px",
				}}
			>
				검색 결과가 없습니다.
			</div>
		);
	}

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
