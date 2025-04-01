import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
	return (
		<div>
			<h1>Home Page</h1>
			<Link to="/models">모델 목록 보러 가기</Link>
		</div>
	);
}

export default HomePage;
