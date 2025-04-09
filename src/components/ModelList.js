import React from "react";
import ModelCard from "./ModelCard";

function ModelList({ models }) {
	return (
		<div className="model-card-container">
			{models.map((model, index) => (
				<ModelCard
					key={index}
					image={model.image}
					name={model.name}
					description={model.description}
				/>
			))}
		</div>
	);
}

export default ModelList;
