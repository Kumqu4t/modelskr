import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultHelmet from "../../components/DefaultHelmet";
import "./NotFoundPage.css";

function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<>
			<DefaultHelmet
				title="페이지를 찾을 수 없습니다"
				description="요청하신 페이지가 존재하지 않거나 이동되었어요."
			/>
			<div className="notfound-page">
				<h1>404</h1>
				<p>페이지를 찾을 수 없습니다.</p>
				<button onClick={() => navigate("/")} className="go-home-button">
					홈으로 돌아가기
				</button>
			</div>
		</>
	);
}

export default NotFoundPage;
