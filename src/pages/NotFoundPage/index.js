import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="notfound-page">
			<h1>404</h1>
			<p>페이지를 찾을 수 없습니다.</p>
			<button onClick={() => navigate("/")} className="go-home-button">
				홈으로 돌아가기
			</button>
		</div>
	);
}

export default NotFoundPage;
