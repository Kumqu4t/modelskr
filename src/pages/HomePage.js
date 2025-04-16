import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelList from "../components/ModelList";
import "../styles/HomePage.css";

function HomePage() {
	// Redux에서 모델 데이터 가져오기
	const models = useSelector((state) => state.models.models);

	// 배열 섞는 함수 (Fisher-Yates Shuffle)
	const shuffleArray = (array) => {
		const newArray = [...array]; // 원본 배열을 건드리지 않기 위해 복사
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1)); // 0 ~ i 까지의 랜덤 인덱스
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 두 값을 교환
		}
		return newArray;
	};
	const randomModels = shuffleArray(models).slice(0, 4);

	return (
		<div className="home-section">
			<h2 className="section-title">🔥 오늘의 모델</h2>
			{/* 모델 리스트 섹션 */}
			<div className="model-list-section">
				<ModelList models={randomModels} />
			</div>
			{/* 더 보러가기 버튼 */}
			<div className="more-wrapper">
				<Link to="/models" className="more-button">
					더 보러가기
				</Link>
			</div>
		</div>
	);
}

export default HomePage;
