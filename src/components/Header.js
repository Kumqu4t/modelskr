import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // 스타일 파일 임포트

function Header() {
	return (
		<header>
			<nav>
				<Link to="/">홈</Link>
				<Link to="/models">모델 목록</Link>
				<Link to="/favorites">즐겨찾기</Link>
				<Link to="/login">로그인(임시)</Link>
				<Link to="/admin">관리자(임시)</Link>
			</nav>
		</header>
	);
}

export default Header;
