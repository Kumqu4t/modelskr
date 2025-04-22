import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Button";
import FavoriteButton from "../FavoriteButton";
import "./ModelCard.css";

function ModelCard({ model, isFavorited, onToggleFavorite }) {
	const { _id: id, name, image, description } = model;
	const navigate = useNavigate();

	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);

	const handleCardClick = () => navigate(`/model/${id}`);

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/${id}`);
	};
	const handleDelete = (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			// dispatch(deleteModel(Number(id)));
		}
	};

	return (
		<div className="model-card" onClick={handleCardClick}>
			<div className="image-wrapper">
				<img src={image} alt={name} />
				<FavoriteButton
					modelId={id}
					isFavorited={isFavorited}
					onToggle={onToggleFavorite}
					className="favorite-icon card-icon"
				/>
			</div>
			<h3 className="model-name">{name}</h3>
			<p className="model-description">{description}</p>

			{isAdmin && (
				<div className="admin-controls">
					<Button type="default" onClick={handleEdit}>
						수정
					</Button>
					<Button type="danger" onClick={handleDelete}>
						삭제
					</Button>
				</div>
			)}
		</div>
	);
}

export default ModelCard;
