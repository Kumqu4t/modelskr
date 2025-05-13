import { useState, useEffect } from "react";
import { API_BASE_URL, getHeaders } from "../api";
import { handleAuthError } from "../utils/handleAuthError";

export function useFavorites(isLoggedIn, kind = "all") {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		if (!isLoggedIn) return;

		const fetchFavorites = async () => {
			try {
				const res = await fetch(`${API_BASE_URL}/api/favorites?kind=${kind}`, {
					headers: getHeaders(localStorage.getItem("token")),
				});
				await handleAuthError(res);
				const data = await res.json();

				setFavorites(data);
			} catch (err) {
				console.error("즐겨찾기 불러오기 실패:", err);
			}
		};

		fetchFavorites();
	}, [isLoggedIn, kind]);

	const toggleFavorite = async (id) => {
		const validFavorites = favorites?.filter((fav) => fav.item !== null);

		const isFav = validFavorites.some(
			(fav) =>
				(typeof fav.item === "object" ? fav.item._id : fav.item) === id &&
				fav.kind === kind
		);

		const method = isFav ? "DELETE" : "POST";
		try {
			const res = await fetch(`${API_BASE_URL}/api/favorites`, {
				method,
				headers: getHeaders(localStorage.getItem("token")),
				body: JSON.stringify({ id, kind }),
			});
			await handleAuthError(res);
			setFavorites((prev) =>
				isFav
					? prev.filter(
							(fav) =>
								!(
									(typeof fav.item === "object" ? fav.item._id : fav.item) ===
										id && fav.kind === kind
								)
					  )
					: [...prev, { item: { _id: id }, kind }]
			);
		} catch (err) {
			console.error("즐겨찾기 변경 실패:", err);
		}
	};

	return { favorites, toggleFavorite };
}
