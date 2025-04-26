import React, { useState, useEffect } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelList from "../../components/ModelList";
import { API_BASE_URL } from "../../api";
import DefaultHelmet from "../../components/DefaultHelmet";
import "./HomePage.css";

function HomePage() {
	const [models, setModels] = useState([]);
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Model");

	useEffect(() => {
		const fetchRandomModels = async () => {
			try {
				const res = await fetch(`${API_BASE_URL}/api/models/random?limit=4`);
				const data = await res.json();
				setModels(data);
			} catch (err) {
				console.error("랜덤 모델 불러오기 실패:", err);
			}
		};

		fetchRandomModels();
	}, []);

	return (
		<>
			<DefaultHelmet
				title="홈페이지"
				description="모델과 에이전시 정보, 최신 모델들을 확인할 수 있는 곳입니다."
			/>
			<div className="home-section">
				<h2 className="section-title"> Models of the day </h2>
				<div className="model-list-section">
					<ModelList
						type="models"
						models={models}
						favorites={favorites}
						onToggleFavorite={toggleFavorite}
					/>{" "}
				</div>
				<div className="more-wrapper">
					<Link to="/models" className="more-button">
						더 보러가기
					</Link>
				</div>
			</div>
		</>
	);
}

export default HomePage;
