import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteModel } from "../../redux/models/modelsSlice";
import Button from "../../components/Button";
import FavoriteButton from "../../components/FavoriteButton";
import "./ModelDetailPage.css";
import "../../components/FilterButton/FilterButton.css";

function ModelDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const models = useSelector((state) => state.models.models);
	const model = models.find((item) => item.id === Number(id));
	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);

	if (!models.length) return <div>로딩 중...</div>;
	if (!model) return <div>해당 모델을 찾을 수 없습니다.</div>;

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/${id}`);
	};
	const handleDelete = (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			dispatch(deleteModel(Number(id)));
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
					modelId={Number(id)}
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
							navigate(`/agencies?keyword=${encodeURIComponent(model.agency)}`)
						}
					>
						{model.agency}
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
