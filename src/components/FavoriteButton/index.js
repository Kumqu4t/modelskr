import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";

function FavoriteButton({ modelId, className, onClick }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const favorites = useSelector((state) => state.favorites.items);
	const isFavorited = favorites.includes(modelId);
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const handleClick = (e) => {
		e.stopPropagation();
		if (!isLoggedIn) {
			const confirmLogin = window.confirm(
				"로그인 후 즐겨찾기를 이용하실 수 있습니다. 로그인 페이지로 이동하시겠습니까?"
			);
			if (confirmLogin) {
				navigate("/login");
			}
			return;
		}

		dispatch(toggleFavorite(modelId));
		// if (onClick) onClick();
	};

	return (
		<div className={className} onClick={handleClick}>
			{isFavorited ? "★" : "☆"}
		</div>
	);
}

export default FavoriteButton;
