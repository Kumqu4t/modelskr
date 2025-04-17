import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelList from "../../components/ModelList";
import "./HomePage.css";

function HomePage() {
	const models = useSelector((state) => state.models.models);

	// 배열 섞는 함수 (Fisher-Yates Shuffle)
	const shuffleArray = (array) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};
	const randomModels = shuffleArray(models).slice(0, 4);

	return (
		<div className="home-section">
			<h2 className="section-title"> Models of the day </h2>
			<div className="model-list-section">
				<ModelList models={randomModels} />
			</div>
			<div className="more-wrapper">
				<Link to="/models" className="more-button">
					더 보러가기
				</Link>
			</div>
		</div>
	);
}

export default HomePage;
