import { API_BASE_URL, getHeaders } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import FavoriteButton from "../../components/FavoriteButton";
import { useState, useEffect } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";
// import "./ModelDetailPage.css";

function PhotographerDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const kind = "Photographer";

	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);

	const [photographer, setPhotographer] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	useEffect(() => {
		const fetchPhotographerDetails = async () => {
			try {
				const res = await fetch(`${API_BASE_URL}/api/photographers/${id}`);
				if (!res.ok) throw new Error("작가 불러오기 실패.");
				const data = await res.json();
				setPhotographer(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPhotographerDetails();
	}, [id]);

	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, kind);

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/photographers/${id}`);
	};

	const handleDelete = async (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			try {
				const res = await fetch(`${API_BASE_URL}/api/photographers/${id}`, {
					method: "DELETE",
					headers: getHeaders(localStorage.getItem("token")),
				});
				if (!res.ok) throw new Error("삭제 실패");
				alert("삭제되었습니다.");
				navigate("/admin");
			} catch (error) {
				console.error("삭제 중 오류:", error);
				alert("삭제에 실패했습니다.");
			}
		}
	};

	const handleToggleFavorite = toggleFavorite;

	if (isLoading) return <Loading />;
	if (error) return <div>{error}</div>;
	if (!photographer) return <div>해당 작가를 찾을 수 없습니다.</div>;

	return (
		<>
			<DefaultHelmet
				title={photographer.name}
				description={photographer.description}
			/>
			<div className="model-detail">
				<div className="buttons-wrapper">
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
					<Button
						type="default"
						onClick={() => window.open(photographer.contact, "_blank")}
					>
						Contact
					</Button>
				</div>

				<div className="image-wrapper">
					<img src={photographer.image} alt={photographer.name} />
					<FavoriteButton
						modelId={photographer._id}
						kind={kind}
						isFavorited={favorites.some(
							(fav) => fav.item?._id === photographer._id
						)}
						onToggle={handleToggleFavorite}
						className={"favorite-icon detail-icon"}
					/>
				</div>

				<div className="model-detail-info">
					<h2>{photographer.name}</h2>
					<p>{photographer.description}</p>
					<p>
						<strong>성별:</strong>{" "}
						<span
							className="filter-button"
							onClick={() =>
								navigate(`/photographers?gender=${photographer.gender}`)
							}
						>
							{photographer.gender}
						</span>
					</p>
					<p>
						<strong>에이전시:</strong>{" "}
						{photographer.agency?.name ? (
							<span
								className="filter-button"
								onClick={() =>
									navigate(
										`/agencies/${encodeURIComponent(photographer.agency._id)}`
									)
								}
							>
								{photographer.agency.name}
							</span>
						) : (
							<span className="filter-button disabled">무소속</span>
						)}
					</p>
					<div className="tag-list">
						{photographer.tags.map((tag, index) => (
							<span
								key={index}
								className="filter-button"
								onClick={() =>
									navigate(`/photographers?tag=${encodeURIComponent(tag)}`)
								}
							>
								{tag}
							</span>
						))}
					</div>
					<div className="recent-work-list">
						<h3>최근 활동</h3>
						{photographer.recentWork.map((item, index) => (
							<div key={index} className="recent-work-item">
								<strong>[{item.type}]</strong>{" "}
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.title}
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default PhotographerDetailPage;
