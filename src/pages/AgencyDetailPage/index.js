import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ModelList from "../../components/ModelList";
import Button from "../../components/Button";
import "./AgencyDetailPage.css";

function AgencyDetailPage() {
	const { id } = useParams();
	const decodedName = decodeURIComponent(id);

	const models = useSelector((state) => state.models.models);
	const agencies = useSelector((state) => state.agencies.agencies);
	const agency = agencies.find((a) => a.name === decodedName);
	const filteredModels = models.filter(
		(model) => model.agency === agency?.name
	);

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
				<ModelList models={filteredModels} />
			</div>
		</div>
	);
}

export default AgencyDetailPage;
