import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFavorites } from "../../hooks/useFavorites";
import { useModelById, useDeleteModel } from "../../hooks/models";
import { getCloudinaryWebp } from "../../utils/getCloudinaryWebp";
import DefaultHelmet from "../../components/DefaultHelmet";
import Button from "../../components/Button";
import FavoriteButton from "../../components/FavoriteButton";
import Loading from "../../components/Loading";
import "./ModelDetailPage.css";

function ModelDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const kind = "Model";

	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);

	const { data: model, isLoading, error } = useModelById(id);
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, kind);

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/models/${id}`);
	};

	const deleteModel = useDeleteModel();

	const handleDelete = (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			deleteModel.mutate(id, {
				onSuccess: () => {
					alert("삭제되었습니다.");
					navigate("/admin");
				},
				onError: (error) => {
					console.error("삭제 중 오류:", error);
					alert("삭제에 실패했습니다.");
				},
			});
		}
	};

	const handleToggleFavorite = toggleFavorite;

	if (isLoading) return <Loading />;
	if (error) return <div>{error}</div>;
	if (!model) return <div>해당 모델을 찾을 수 없습니다.</div>;

	return (
		<>
			<DefaultHelmet title={model?.name} description={model?.description} />
			<div className="model-detail">
				<div className="buttons-wrapper desktop-only">
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
						onClick={() => window.open(model.contact, "_blank")}
					>
						Instagram
					</Button>
				</div>
				<div className="imageinfo-wrapper">
					<div className="image-wrapper">
						<img
							src={getCloudinaryWebp(model.image?.url)}
							alt={model.name}
							onClick={() => {
								if (model.image?.url) window.open(model.image?.url, "_blank");
							}}
						/>
						{model?._id && (
							<FavoriteButton
								modelId={model._id}
								isFavorited={favorites.some(
									(fav) => fav.item?._id === model._id
								)}
								onToggle={handleToggleFavorite}
								className={"favorite-icon detail-icon"}
							/>
						)}
					</div>
					<div className="buttons-wrapper mobile-only">
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
							onClick={() => window.open(model.contact, "_blank")}
						>
							Instagram
						</Button>
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
							{model.agency?.name ? (
								<span
									className="filter-button"
									onClick={() =>
										navigate(
											`/agencies/${encodeURIComponent(model.agency._id)}`
										)
									}
								>
									{model.agency.name}
								</span>
							) : (
								<span className="filter-button disabled">무소속</span>
							)}
						</p>

						{model.birthYear && (
							<p>
								<strong>출생년도:</strong> {model.birthYear}
							</p>
						)}
						{model.nationality && (
							<p>
								<strong>국적:</strong> {model.nationality}
							</p>
						)}
						{model.height && (
							<p>
								<strong>키:</strong> {model.height} cm
							</p>
						)}
						{model.measurements && (
							<p>
								<strong>사이즈:</strong> {model.measurements.chest || "-"} /{" "}
								{model.measurements.waist || "-"} /{" "}
								{model.measurements.hips || "-"} inch
							</p>
						)}
						{model.shoeSize && (
							<p>
								<strong>신발 사이즈:</strong> {model.shoeSize}
							</p>
						)}
					</div>
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
		</>
	);
}

export default ModelDetailPage;
