import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton";
import "./ModelCard.css";

function ModelCard({ type, model, isFavorited, onToggleFavorite }) {
	const { _id: id, name, image } = model;
	const navigate = useNavigate();

	const handleCardClick = () => navigate(`/${type}/${id}`);

	return (
		<div className="model-card" onClick={handleCardClick}>
			<div className="image-wrapper">
				<img src={image?.url} alt={name} />
				<FavoriteButton
					modelId={id}
					kind={type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)}
					isFavorited={isFavorited}
					onToggle={onToggleFavorite}
					className="favorite-icon card-icon"
				/>
			</div>
			<h3 className="model-name">{name}</h3>
			{/* <p className="model-description">{description}</p> */}
		</div>
	);
}

export default ModelCard;
