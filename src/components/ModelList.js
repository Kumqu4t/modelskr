import React, { useEffect, useState } from "react";
import ModelCard from "./ModelCard";

function ModelList({ query }) {
	const [models, setModels] = useState([]);
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		fetch("/mock/models.json")
			.then((res) => res.json())
			.then((data) => {
				setModels(data);
			});
	}, []);

	useEffect(() => {
		let result = models;

		if (query.favorite) {
			result = result.filter((model) => model.isFavorite);
		}
		if (query.keyword) {
			result = result.filter((model) =>
				model.name.toLowerCase().includes(query.keyword.toLowerCase())
			);
		}
		if (query.gender) {
			result = result.filter((model) => model.gender === query.gender);
		}

		setFiltered(result);
	}, [models, query]);

	return (
		<div className="model-card-container">
			{filtered.map((model, index) => (
				<ModelCard
					key={index}
					image={model.image}
					name={model.name}
					description={model.description}
				/>
			))}
		</div>
	);
}

export default ModelList;
