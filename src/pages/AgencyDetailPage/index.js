import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import agencies from "../../mock/agencies.json";
import ModelList from "../../components/ModelList";

function AgencyDetailPage() {
	const { id } = useParams();
	const decodedName = decodeURIComponent(id);
	const agency = agencies.find((a) => a.name === decodedName);

	const models = useSelector((state) => state.models.models);
	const filteredModels = models.filter(
		(model) => model.agency === agency?.name
	);

	if (!agency) return <p>존재하지 않는 에이전시입니다.</p>;

	return (
		<div style={{ padding: "24px" }}>
			<h1>{agency.name}</h1>
			<img src={agency.logo} alt="logo" />
			<p>{agency.description}</p>
			<h2>소속 모델</h2>
			<ModelList models={filteredModels} />
		</div>
	);
}

export default AgencyDetailPage;
