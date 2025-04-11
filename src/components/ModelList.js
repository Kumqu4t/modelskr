import React from "react";
import ModelCard from "./ModelCard";

function ModelList({ models }) {
	return (
		<div className="model-card-container">
			{models.map((model) => (
				<ModelCard
					key={model.id}
					id={model.id}
					image={model.image}
					name={model.name}
					description={model.description}
				/>
			))}
		</div>
	);
}

export default ModelList;
