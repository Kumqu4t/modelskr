import React from "react";
import "../styles/ModelCard.css";

function ModelCard({ name, image, description }) {
	return (
		<div className="model-card">
			<img src={image} alt={name} className="model-image" />
			<h3 className="model-name">{name}</h3>
			<p className="model-description">{description}</p>
		</div>
	);
}

export default ModelCard;
