import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ModelList from "../../components/ModelList";
import Button from "../../components/Button";
import { useFavorites } from "../../hooks/useFavorites";
import "./AgencyDetailPage.css";

function AgencyDetailPage() {
	const { id } = useParams();
	const decodedName = decodeURIComponent(id);

	const [agency, setAgency] = useState(null);
	const [models, setModels] = useState([]);
	const [loading, setLoading] = useState(true);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Model");

	useEffect(() => {
		const fetchAgencyDetails = async () => {
			try {
				const res = await axios.get(`/api/agencies/${decodedName}`);
				setAgency(res.data);
				setModels(res.data.models);
				console.log("에이전시 정보 가져오기 성공", res.data);
				console.log("에이전시 모델 정보 가져오기 성공", res.data.models);
			} catch (error) {
				console.error("에이전시 정보 가져오기 실패", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAgencyDetails();
	}, [decodedName]);

	if (loading) return <p>로딩 중...</p>;

	if (!agency) return <p>존재하지 않는 에이전시입니다.</p>;

	return (
		<div className="agency-detail-page">
			<div className="agency-info-section">
				<img src={agency.logo} alt="logo" className="agency-logo" />
				<div className="agency-text">
					<h1>{agency.name}</h1>
					<p className="agency-description">{agency.description}</p>
				</div>
				<div className="homepage-button-wrapper">
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
	);
}

export default AgencyDetailPage;
