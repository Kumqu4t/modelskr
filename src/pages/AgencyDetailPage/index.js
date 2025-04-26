import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL, getHeaders } from "../../api";
import DefaultHelmet from "../../components/DefaultHelmet";
import ModelList from "../../components/ModelList";
import Button from "../../components/Button";
import { useFavorites } from "../../hooks/useFavorites";
import "./AgencyDetailPage.css";

function AgencyDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const decodedName = decodeURIComponent(id);

	const [agency, setAgency] = useState(null);
	const [models, setModels] = useState([]);
	const [loading, setLoading] = useState(true);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const isAdmin = useSelector(
		(state) => state.user.user?.email === "qufgkswkfl3@gmail.com"
	);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Model");

	useEffect(() => {
		const fetchAgencyDetails = async () => {
			try {
				const res = await axios.get(
					`${API_BASE_URL}/api/agencies/${decodedName}`
				);
				setAgency(res.data);
				setModels(res.data.models);
				// console.log("에이전시 정보 가져오기 성공", res.data);
				// console.log("에이전시 모델 정보 가져오기 성공", res.data.models);
			} catch (error) {
				// console.error("에이전시 정보 가져오기 실패", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAgencyDetails();
	}, [decodedName]);

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/agencies/${id}`);
	};

	const handleDelete = async (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			try {
				const res = await fetch(`${API_BASE_URL}/api/agencies/${id}`, {
					method: "DELETE",
					headers: getHeaders(localStorage.getItem("token")),
				});
				if (!res.ok) throw new Error("삭제 실패");
				alert("삭제되었습니다.");
				navigate("/agencies");
			} catch (error) {
				console.error("삭제 중 오류:", error);
				alert("삭제에 실패했습니다.");
			}
		}
	};

	if (loading) return <p>로딩 중...</p>;

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
					<div className="homepage-button-wrapper">
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
