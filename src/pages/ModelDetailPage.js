import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ModelDetailPage.css";
import "../styles/FilterButton.css";

function ModelDetailPage({ favorites, setFavorites }) {
	const { id } = useParams(); // URL의 id 추출
	const [model, setModel] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("/mock/models.json")
			.then((res) => res.json())
			.then((data) => {
				const found = data.find((item) => item.id === Number(id));
				setModel(found);
			})
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <div>로딩 중...</div>;
	if (!model) return <div>해당 모델을 찾을 수 없습니다.</div>;

	// Favorite Button
	const isFavorited = favorites.includes(model.id);
	const toggleFavorite = () => {
		setFavorites((prev) =>
			prev.includes(model.id)
				? prev.filter((fid) => fid !== model.id)
				: [...prev, model.id]
		);
	};

	return (
		<div className="model-detail">
			<button className="favorite-icon detail-icon" onClick={toggleFavorite}>
				{isFavorited ? "★" : "☆"}
			</button>
			<img src={model.image} alt={model.name} />
			<div className="model-detail-info">
				<h2>{model.name}</h2>
				<p>{model.description}</p>
				{/* <p>성별: {model.tags.includes("male") ? "남성" : "여성"}</p> */}

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
					<div>
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
			</div>
		</div>
	);
}

export default ModelDetailPage;
