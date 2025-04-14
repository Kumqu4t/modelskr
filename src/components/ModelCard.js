import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ModelCard.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favorites/favoritesSlice";

function ModelCard({ id, name, image, description }) {
	const favorites = useSelector((state) => state.favorites.items);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const isFavorited = favorites?.includes(id);

	const handleToggle = (e) => {
		e.stopPropagation(); // 카드 클릭 막기
		dispatch(toggleFavorite(id));
	};

	return (
		<div className="model-card" onClick={() => navigate(`/model/${id}`)}>
			<div className="image-wrapper">
				<img src={image} alt={name} />
				<div className="favorite-icon card-icon" onClick={handleToggle}>
					{isFavorited ? "★" : "☆"}
				</div>
			</div>
			<h3 className="model-name">{name}</h3>
			<p className="model-description">{description}</p>
		</div>
	);
}
export default ModelCard;
