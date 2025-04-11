import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import SearchBar from "./SearchBar";

function Header() {
	const [keyword, setKeyword] = useState("");

	return (
		<header>
			<nav>
				<Link to="/">홈</Link>
				<Link to="/models">모델 목록</Link>
				<Link to="/favorites">즐겨찾기</Link>
				<Link to="/login">로그인(임시)</Link>
				<Link to="/admin">관리자(임시)</Link>
				<SearchBar
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
			</nav>
		</header>
	);
}

export default Header;
