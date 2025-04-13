import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import SearchBar from "./SearchBar";

function Header() {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault(); // 기본 이벤트 제거
		if (keyword.trim()) {
			navigate(`/models?keyword=${encodeURIComponent(keyword.trim())}`);
			setKeyword("");
		}
	};

	return (
		<header>
			<nav>
				<Link to="/">홈</Link>
				<Link to="/models">모델 목록</Link>
				<Link to="/favorites">즐겨찾기</Link>
				<Link to="/login">로그인(임시)</Link>
				<Link to="/admin">관리자(임시)</Link>
				<form onSubmit={handleSubmit}>
					<SearchBar
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
				</form>
			</nav>
		</header>
	);
}

export default Header;
