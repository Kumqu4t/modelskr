import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import FavoriteButton from "../../components/FavoriteButton";
import { useFavorites } from "../../hooks/useFavorites";
import { usePhotoById, useDeletePhoto } from "../../hooks/photos";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";
import { linkifyDescription } from "../../utils/linkify";
import "./PhotoDetailPage.css";

const PhotoDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: photo, isLoading, error } = usePhotoById(id);

	const [currentIndex, setCurrentIndex] = React.useState(0);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const isAdmin = useSelector(
		(state) => state.user.user?.email === process.env.REACT_APP_ADMIN_EMAIL
	);

	const { favorites: photoFavorites, toggleFavorite: togglePhotoFavorite } =
		useFavorites(isLoggedIn, "Photo");

	const deletePhoto = useDeletePhoto();

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/photos/${id}`);
	};

	const handleDelete = async () => {
		if (!window.confirm("정말 삭제하시겠습니까?")) return;

		deletePhoto.mutate(id, {
			onSuccess: () => {
				alert("사진이 삭제되었습니다.");
				navigate("/photos");
			},
			onError: () => {
				alert("사진 삭제 실패");
			},
		});
	};

	if (isLoading) return <Loading />;
	if (error) return <div>{error}</div>;
	if (!photo) return <div>해당 사진을 찾을 수 없습니다.</div>;

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photo.images.length - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % photo.images.length);
	};

	return (
		<>
			<DefaultHelmet title={photo.title} description={photo.description} />
			<div className="photo-detail-page">
				<div className="headline">
					<h1>{photo.title}</h1>

					<div className="photo-buttons-wrapper desktop-only">
						{isAdmin && (
							<div className="admin-controls-detail">
								<Button type="default" onClick={handleEdit}>
									수정
								</Button>
								<Button type="danger" onClick={handleDelete}>
									삭제
								</Button>
							</div>
						)}
						<FavoriteButton
							modelId={photo._id}
							kind={"Photo"}
							isFavorited={photoFavorites.some(
								(fav) => fav.item?._id === photo._id
							)}
							onToggle={togglePhotoFavorite}
							className={"photo-detail-icon"}
						/>
					</div>
				</div>
				<span
					className="photo-detail-category"
					onClick={() => navigate(`/photos?category=${photo.category}`)}
				>
					{photo.category} {">"}
				</span>

				<div className="photo-gallery">
					{photo.images.length > 1 && (
						<button
							onClick={handlePrev}
							className="nav-button"
							aria-label="이전 사진"
						>
							{"<"}
						</button>
					)}
					<div className="photo-image-wrapper">
						<img
							src={photo.images[currentIndex]?.url}
							alt={`${photo.title} - ${currentIndex + 1}`}
						/>
					</div>
					{photo.images.length > 1 && (
						<button
							onClick={handleNext}
							className="nav-button"
							aria-label="다음 사진"
						>
							{">"}
						</button>
					)}
					{photo.images.length > 1 && (
						<div className="photo-indicator">
							{photo.images?.map((_, idx) => (
								<span
									key={idx}
									className={`indicator-dot ${
										idx === currentIndex ? "active" : ""
									}`}
								/>
							))}
						</div>
					)}
				</div>

				<div className="photo-buttons-wrapper mobile-only">
					{isAdmin && (
						<div className="admin-controls-detail">
							<Button type="default" onClick={handleEdit}>
								수정
							</Button>
							<Button type="danger" onClick={handleDelete}>
								삭제
							</Button>
						</div>
					)}
					<FavoriteButton
						modelId={photo._id}
						kind={"Photo"}
						isFavorited={photoFavorites.some(
							(fav) => fav.item?._id === photo._id
						)}
						onToggle={togglePhotoFavorite}
						className={"photo-detail-icon"}
					/>
				</div>
				<p
					dangerouslySetInnerHTML={{
						__html: linkifyDescription(photo.description, [
							...photo.models?.map((m) => ({ ...m, type: "model" })),
							...photo.people?.map((p) => ({
								...p,
								type: "person",
							})),
						]),
					}}
				></p>

				<div className="tags">
					{photo.tags?.map((tag, index) => (
						<span key={index} className="tag">
							{tag}
						</span>
					))}
				</div>

				<h2>참여 모델</h2>
				<div className="simple-list">
					{photo.models?.map((model) => (
						<span
							key={model._id}
							className="link-name"
							onClick={() => navigate(`/models/${model._id}`)}
						>
							{model.name}
						</span>
					))}
				</div>

				<h2>참여 인물</h2>
				<div className="simple-list">
					{photo.people?.map((person) => (
						<span
							key={person._id}
							className="link-name"
							onClick={() => navigate(`/people/${person._id}`)}
						>
							{person.name}
						</span>
					))}
				</div>
			</div>
		</>
	);
};

export default PhotoDetailPage;
