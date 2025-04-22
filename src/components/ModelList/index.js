import React from "react";
import ModelCard from "../ModelCard";
import "./ModelList.css";

function ModelList({ models, favorites = [], onToggleFavorite }) {
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
					key={model._id}
					model={model}
					isFavorited={favorites.includes(model._id)}
					onToggleFavorite={onToggleFavorite}
				/>
			))}
		</div>
	);
}

export default ModelList;
