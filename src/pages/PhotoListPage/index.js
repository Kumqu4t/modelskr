import React, { useState, useEffect } from "react";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import PhotoList from "../../components/PhotoList";
import { API_BASE_URL } from "../../api";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";
import "./PhotoListPage.css";

const PhotoListPage = () => {
	const [photos, setPhotos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { keyword, category } = useQueryFilters("/photos");

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				const params = new URLSearchParams();
				if (category && category !== "all") params.set("category", category);
				if (keyword) params.set("keyword", keyword);
				params.set("fields", "images,title,_id");

				const res = await fetch(
					`${API_BASE_URL}/api/photos?${params.toString()}`
				);
				if (!res.ok) throw new Error("사진을 불러오는 데 실패했습니다.");
				const data = await res.json();
				setPhotos(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPhotos();
	}, [category, keyword]);

	if (isLoading) return <Loading />;
	if (photos.length === 0) return <div>사진이 없습니다.</div>;
	if (error) return <div>{error}</div>;

	return (
		<>
			<DefaultHelmet
				title="사진 리스트"
				description="다양한 사진들을 확인할 수 있는 페이지입니다."
			/>
			<div className="photos-page" style={{ padding: "24px" }}>
				<h1 className="admin-title">
					{category === "all"
						? "All Photos"
						: category[0].toUpperCase() + category.slice(1)}
				</h1>
				<PhotoList photos={photos} />
			</div>
		</>
	);
};

export default PhotoListPage;
