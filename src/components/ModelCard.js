import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favorites/favoritesSlice";
import { deleteModel } from "../redux/models/modelsSlice";
import "../styles/ModelCard.css";

function ModelCard({ id, name, image, description }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Redux 상태
	const favorites = useSelector((state) => state.favorites.items);
	const isFavorited = favorites.includes(id);
	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);

	// 핸들러
	const handleCardClick = () => navigate(`/model/${id}`);
	const handleToggleFavorite = (e) => {
		e.stopPropagation();
		dispatch(toggleFavorite(id));
	};
	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/${id}`);
	};
	const handleDelete = (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			dispatch(deleteModel(id));
		}
	};

	return (
		<div className="model-card" onClick={handleCardClick}>
			<div className="image-wrapper">
				<img src={image} alt={name} />
				<div className="favorite-icon card-icon" onClick={handleToggleFavorite}>
					{isFavorited ? "★" : "☆"}
				</div>
			</div>
			<h3 className="model-name">{name}</h3>
			<p className="model-description">{description}</p>

			{isAdmin && (
				<div className="admin-controls">
					<button onClick={handleEdit}>수정</button>
					<button onClick={handleDelete}>삭제</button>
				</div>
			)}
		</div>
	);
}

export default ModelCard;
