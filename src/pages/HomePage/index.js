import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModelList from "../../components/ModelList";
import "./HomePage.css";

function HomePage() {
	const [models, setModels] = useState([]);

	useEffect(() => {
		const fetchRandomModels = async () => {
			try {
				const res = await fetch("/api/models/random?limit=4");
				const data = await res.json();
				setModels(data);
			} catch (err) {
				console.error("랜덤 모델 불러오기 실패:", err);
			}
		};

		fetchRandomModels();
	}, []);

	return (
		<div className="home-section">
			<h2 className="section-title"> Models of the day </h2>
			<div className="model-list-section">
				<ModelList models={models} />
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
