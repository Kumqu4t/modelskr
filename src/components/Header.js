import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header>
			<nav>
				<Link to="/">홈</Link>
				<Link to="/models">모델 목록</Link>
				<Link to="/favorites">즐겨찾기</Link>
			</nav>
		</header>
	);
}

export default Header;
