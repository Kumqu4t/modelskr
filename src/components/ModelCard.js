import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ModelCard.css";
function ModelCard({ id, name, image, description, favorites, setFavorites }) {
	const navigate = useNavigate();
	const isFavorited = favorites?.includes(id);

	const toggleFavorite = (e) => {
		e.stopPropagation(); // 카드 클릭 막기
		setFavorites((prev) =>
			prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
		);
	};

	return (
		<div className="model-card" onClick={() => navigate(`/model/${id}`)}>
			<div className="image-wrapper">
				<img src={image} alt={name} />
				<div className="favorite-icon card-icon" onClick={toggleFavorite}>
					{isFavorited ? "★" : "☆"}
				</div>
			</div>
			<h3 className="model-name">{name}</h3>
			<p className="model-description">{description}</p>
		</div>
	);
}
export default ModelCard;
