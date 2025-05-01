import React from "react";
import { useFavorites } from "../../hooks/useFavorites";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModelList from "../../components/ModelList";
import { useRandomModels } from "../../hooks/models";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";
import "./HomePage.css";

function HomePage() {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Model");
	const { data: models = [], isLoading } = useRandomModels(4);

	if (isLoading) return <Loading />;

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
