import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Button";
import FavoriteButton from "../FavoriteButton";
import "./ModelCard.css";

function ModelCard({ type, model, isFavorited, onToggleFavorite }) {
	const { _id: id, name, image, description = "" } = model;
	const navigate = useNavigate();

	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);

	const handleCardClick = () => navigate(`/${type}/${id}`);

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/${type}/${id}`);
	};
	const handleDelete = async (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			try {
				const res = await fetch(`/api/${type}/${id}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				if (!res.ok) throw new Error("삭제 실패");
				alert("삭제되었습니다.");
				window.location.reload();
			} catch (error) {
				console.error("삭제 중 오류:", error);
				alert("삭제에 실패했습니다.");
			}
		}
	};

	return (
		<div className="model-card" onClick={handleCardClick}>
			<div className="image-wrapper">
				<img src={image} alt={name} />
				<FavoriteButton
					modelId={id}
					kind={type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)}
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
