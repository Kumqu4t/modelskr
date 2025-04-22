import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteModel } from "../../redux/models/modelsSlice";
import Button from "../../components/Button";
import FavoriteButton from "../../components/FavoriteButton";
import { useState, useEffect } from "react";
import "./ModelDetailPage.css";

function ModelDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [model, setModel] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchModelDetails = async () => {
			try {
				const res = await fetch(`/api/models/${id}`);
				if (!res.ok) throw new Error("모델을 불러오는 데 실패했습니다.");
				const data = await res.json();
				console.log("모델 data:", data);
				setModel(data);
			} catch (err) {
				setError(err.message);
				console.error("모델 상세 정보 불러오기 실패:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchModelDetails();
	}, [id]);

	if (isLoading) return <div>로딩 중...</div>;
	if (error) return <div>{error}</div>;
	if (!model) return <div>해당 모델을 찾을 수 없습니다.</div>;

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
					className={"favorite-icon detail-icon"}
				/>
			</div>

			<div className="model-detail-info">
				<h2>{model.name}</h2> {/* 모델 이름 */}
				<p>{model.description}</p> {/* 모델 설명 */}
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
						{model.agency.name} {/* agency.name 사용 */}
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

			<div className="admin-controls-detail">
				<Button type="default" onClick={handleEdit}>
					수정
				</Button>
				<Button type="danger" onClick={handleDelete}>
					삭제
				</Button>
			</div>
		</div>
	);
}

export default ModelDetailPage;
