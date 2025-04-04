import React from "react";
import ModelCard from "../components/ModelCard";

const mockData = [
	{ image: "/path/to/image1.jpg", name: "Model 1", description: "모델 1 설명" },
	{ image: "/path/to/image2.jpg", name: "Model 2", description: "모델 2 설명" },
	{ image: "/path/to/image3.jpg", name: "Model 3", description: "모델 3 설명" },
	{ image: "/path/to/image4.jpg", name: "Model 4", description: "모델 4 설명" },
	{ image: "/path/to/image5.jpg", name: "Model 5", description: "모델 5 설명" },
	{ image: "/path/to/image6.jpg", name: "Model 6", description: "모델 6 설명" },
	{ image: "/path/to/image7.jpg", name: "Model 7", description: "모델 7 설명" },
	{ image: "/path/to/image8.jpg", name: "Model 8", description: "모델 8 설명" },
];

function ModelListPage() {
	return (
		<div className="model-card-container">
			{mockData.map((model, index) => (
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

export default ModelListPage;
