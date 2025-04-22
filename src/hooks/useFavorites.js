import { useState, useEffect } from "react";

export function useFavorites(isLoggedIn) {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		if (!isLoggedIn) return;
		const fetchFavorites = async () => {
			try {
				const res = await fetch("/api/favorites", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				const data = await res.json();
				setFavorites(data.map((model) => model._id));
			} catch (err) {
				console.error("즐겨찾기 불러오기 실패:", err);
			}
		};
		fetchFavorites();
	}, [isLoggedIn]);

	const toggleFavorite = async (modelId) => {
		const isFav = favorites.includes(modelId);
		const method = isFav ? "DELETE" : "POST";
		try {
			await fetch(`/api/favorites/${modelId}`, {
				method,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			setFavorites((prev) =>
				isFav ? prev.filter((id) => id !== modelId) : [...prev, modelId]
			);
		} catch (err) {
			console.error("즐겨찾기 변경 실패:", err);
		}
	};

	return { favorites, toggleFavorite };
}
