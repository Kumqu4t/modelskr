import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import ModelList from "../../components/ModelList";
import { useFavorites } from "../../hooks/useFavorites";
import "./PhotoDetailPage.css";

const PhotoDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [photo, setPhoto] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const token = localStorage.getItem("token");
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn);

	useEffect(() => {
		const fetchPhoto = async () => {
			try {
				const res = await fetch(`/api/photos/${id}`);
				if (!res.ok) throw new Error("사진을 불러오는 데 실패했습니다.");
				const data = await res.json();
				setPhoto(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPhoto();
	}, [id]);

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/photos/${id}`);
	};

	const handleDelete = async () => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			try {
				const res = await fetch(`/api/photos/${id}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!res.ok) throw new Error("사진 삭제 실패");
				alert("사진이 삭제되었습니다.");
				navigate("/photos");
			} catch (err) {
				alert("사진 삭제 실패");
			}
		}
	};

	if (isLoading) return <div>로딩 중...</div>;
	if (error) return <div>{error}</div>;
	if (!photo) return <div>해당 사진을 찾을 수 없습니다.</div>;

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photo.images.length - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % photo.images.length);
	};

	return (
		<div className="photo-detail-page">
			<h1>{photo.title}</h1>
			<div className="photo-gallery">
				<button
					onClick={handlePrev}
					className="nav-button"
					aria-label="이전 사진"
				>
					←
				</button>
				<div className="photo-image-wrapper">
					<img
						src={photo.images[currentIndex]}
						alt={`${photo.title} - ${currentIndex + 1}`}
					/>
				</div>
				<button
					onClick={handleNext}
					className="nav-button"
					aria-label="다음 사진"
				>
					→
				</button>
			</div>
			<p>{photo.description}</p>
			<div className="tags">
				{photo.tags.map((tag, index) => (
					<span key={index} className="tag">
						{tag}
					</span>
				))}
			</div>
			<Button type="default" onClick={handleEdit}>
				수정
			</Button>
			<Button type="danger" onClick={handleDelete}>
				삭제
			</Button>
			<h2>참여 모델</h2>
			<ModelList
				models={photo.models}
				favorites={favorites}
				onToggleFavorite={toggleFavorite}
			/>
		</div>
	);
};

export default PhotoDetailPage;
