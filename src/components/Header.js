import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import "../styles/Header.css";
import SearchBar from "./SearchBar";

function Header() {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Redux 상태 가져오기
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const user = useSelector((state) => state.user.user);

	// 검색어 입력 시 검색 결과 페이지로 이동
	const handleSubmit = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/models?keyword=${encodeURIComponent(keyword.trim())}`);
			setKeyword("");
		}
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header>
			<nav>
				<Link to="/">홈</Link>
				<Link to="/models">모델 목록</Link>
				<Link to="/favorites">즐겨찾기</Link>
				<Link to="/admin">관리자(임시)</Link>
				<SearchBar
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					onSubmit={handleSubmit}
				/>
				{/* 로그인 상태에 따라 다른 UI */}
				<div className="login-wrapper">
					{isLoggedIn ? (
						<div className="user-info">
							<img src={user.picture} alt="프로필" />
							<p>{user.name}</p>
							<button onClick={handleLogout}>로그아웃</button>
						</div>
					) : (
						<Link to="/login" style={{ color: "white" }}>
							로그인
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
