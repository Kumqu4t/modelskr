import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultHelmet from "../../components/DefaultHelmet";
import ModelList from "../../components/ModelList";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { useFavorites } from "../../hooks/useFavorites";
import { useAgencyById, useDeleteAgency } from "../../hooks/agencies";
import "./AgencyDetailPage.css";

function AgencyDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const decodedName = decodeURIComponent(id);

	const { data: agency, isLoading } = useAgencyById(decodedName);
	const models = agency?.models || [];
	const deleteAgency = useDeleteAgency();

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Model");

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/agencies/${id}`);
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			deleteAgency.mutate(id, {
				onSuccess: () => {
					alert("삭제되었습니다.");
					navigate("/agencies");
				},
				onError: (error) => {
					console.error("삭제 중 오류:", error);
					alert("삭제에 실패했습니다.");
				},
			});
		}
	};

	if (isLoading) return <Loading />;
	if (!agency) return <p>존재하지 않는 에이전시입니다.</p>;

	return (
		<>
			<DefaultHelmet title={agency?.name} description={agency?.description} />
			<div className="agency-detail-page">
				<div className="agency-info-section">
					<img src={agency.logo} alt="logo" className="agency-logo" />
					<div className="agency-text">
						<h1>{agency.name}</h1>
						<p className="agency-description">{agency.description}</p>
					</div>
					<div className="homepage-button-wrapper desktop-only">
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
							onClick={() => window.open(agency.homepage, "_blank")}
						>
							홈페이지
						</Button>
					</div>
				</div>
				<div className="homepage-button-wrapper mobile-only">
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
						onClick={() => window.open(agency.homepage, "_blank")}
					>
						홈페이지
					</Button>
				</div>
				<div className="agency-models-section">
					<h2 className="agency-title">소속 모델</h2>
					<ModelList
						type="models"
						models={models}
						favorites={favorites}
						onToggleFavorite={toggleFavorite}
					/>
				</div>
			</div>
		</>
	);
}

export default AgencyDetailPage;
