import { useState, useEffect } from "react";

export function useFavorites(isLoggedIn, kind = "all") {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		if (!isLoggedIn) return;

		const fetchFavorites = async () => {
			try {
				const res = await fetch(`/api/favorites?kind=${kind}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				const data = await res.json();

				setFavorites(data);
			} catch (err) {
				console.error("즐겨찾기 불러오기 실패:", err);
			}
		};

		fetchFavorites();
	}, [isLoggedIn, kind]);

	const toggleFavorite = async (id) => {
		const validFavorites = favorites.filter((fav) => fav.item !== null);

		const isFav = validFavorites.some(
			(fav) =>
				(typeof fav.item === "object" ? fav.item._id : fav.item) === id &&
				fav.kind === kind
		);

		const method = isFav ? "DELETE" : "POST";
		try {
			await fetch("/api/favorites", {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ id, kind }),
			});
			setFavorites((prev) =>
				isFav
					? prev.filter(
							(fav) =>
								!(
									// 일단 무조건 object화 해줌. item이 추가되면 populate되어 객체가 되기 때문
									(
										(typeof fav.item === "object" ? fav.item._id : fav.item) ===
											id && fav.kind === kind
									)
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
