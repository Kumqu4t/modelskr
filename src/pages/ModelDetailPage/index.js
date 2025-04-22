import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteModel } from "../../redux/models/modelsSlice";
import Button from "../../components/Button";
import FavoriteButton from "../../components/FavoriteButton";
import { useState, useEffect } from "react";
import "./ModelDetailPage.css";

function ModelDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);

	const [model, setModel] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [favorites, setFavorites] = useState([]);
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	useEffect(() => {
		const fetchModelDetails = async () => {
			try {
				const res = await fetch(`/api/models/${id}`);
				if (!res.ok) throw new Error("모델을 불러오는 데 실패했습니다.");
				const data = await res.json();
				setModel(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchModelDetails();
	}, [id]);

	useEffect(() => {
		const fetchFavorites = async () => {
			if (isLoggedIn) {
				try {
					const res = await fetch("/api/favorites", {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					});
					const data = await res.json();
					setFavorites(data.map((item) => item._id));
				} catch (err) {
					console.error("즐겨찾기 불러오기 실패:", err);
				}
			}
		};

		fetchFavorites();
	}, [isLoggedIn]);

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/${id}`);
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			dispatch(deleteModel(id));
		}
	};

	const handleToggleFavorite = async (modelId) => {
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

	if (isLoading) return <div>로딩 중...</div>;
	if (error) return <div>{error}</div>;
	if (!model) return <div>해당 모델을 찾을 수 없습니다.</div>;

	return (
		<div className="model-detail">
			<div className="contact-button-wrapper">
				<Button
					type="default"
					onClick={() => window.open(model.contact, "_blank")}
				>
					Contact
				</Button>
			</div>

			<div className="image-wrapper">
				<img src={model.image} alt={model.name} />
				<FavoriteButton
					modelId={model._id}
					isFavorited={favorites.includes(model._id)}
					onToggle={handleToggleFavorite}
					className={"favorite-icon detail-icon"}
				/>
			</div>

			<div className="model-detail-info">
				<h2>{model.name}</h2>
				<p>{model.description}</p>
				<p>
					<strong>성별:</strong>{" "}
					<span
						className="filter-button"
						onClick={() => navigate(`/models?gender=${model.gender}`)}
					>
						{model.gender}
					</span>
				</p>
				<p>
					<strong>에이전시:</strong>{" "}
					<span
						className="filter-button"
						onClick={() =>
							navigate(
								`/agencies?keyword=${encodeURIComponent(model.agency.name)}`
							)
						}
					>
						{model.agency.name}
					</span>
				</p>
				<div className="tag-list">
					{model.tags.map((tag, index) => (
						<span
							key={index}
							className="filter-button"
							onClick={() => navigate(`/models?tag=${encodeURIComponent(tag)}`)}
						>
							{tag}
						</span>
					))}
				</div>
				<div className="recent-work-list">
					<h3>최근 활동</h3>
					{model.recentWork.map((item, index) => (
						<div key={index} className="recent-work-item">
							<strong>[{item.type}]</strong>{" "}
							<a href={item.link} target="_blank" rel="noopener noreferrer">
								{item.title}
							</a>
						</div>
					))}
				</div>
			</div>

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
		</div>
	);
}

export default ModelDetailPage;
