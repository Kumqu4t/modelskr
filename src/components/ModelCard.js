import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ModelCard.css";

function ModelCard({ id, name, image, description }) {
	const navigate = useNavigate();

	return (
		<div className="model-card" onClick={() => navigate(`/model/${id}`)}>
			<img src={image} alt={name} className="model-image" />
			<h3 className="model-name">{name}</h3>
			<p className="model-description">{description}</p>
		</div>
	);
}

export default ModelCard;
