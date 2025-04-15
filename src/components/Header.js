import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import "../styles/Header.css";
import SearchBar from "./SearchBar";

function Header() {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const user = useSelector((state) => state.user.user);

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
			<div className="header-inner">
				<Link to="/" className="logo">
					Models.kr
				</Link>

				<nav className="nav-links">
					<NavLink to="/models" className="nav-item">
						모델 목록
					</NavLink>
					<NavLink to="/favorites" className="nav-item">
						즐겨찾기
					</NavLink>
					{isLoggedIn && (
						<NavLink to="/admin" className="nav-item">
							관리자
						</NavLink>
					)}
				</nav>

				<div className="searchbar-container">
					<SearchBar
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						onSubmit={handleSubmit}
					/>
				</div>

				<div className="login-wrapper">
					{isLoggedIn ? (
						<div className="user-info">
							<img src={user.picture} alt="프로필" />
							<p>{user.name}</p>
							<button onClick={handleLogout}>로그아웃</button>
						</div>
					) : (
						<NavLink to="/login" className="nav-item">
							로그인
						</NavLink>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
