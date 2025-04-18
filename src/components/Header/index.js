import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import SearchBar from "../SearchBar";
import Button from "../Button";
import "./Header.css";

function Header() {
	const [keyword, setKeyword] = useState("");
	const [searchTarget, setSearchTarget] = useState("models");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const user = useSelector((state) => state.user.user);
	const isAdmin = user?.email === "qufgkswkfl3@gmail.com";

	const handleSubmit = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(
				`/${searchTarget}?keyword=${encodeURIComponent(keyword.trim())}`
			);
			setKeyword("");
		}
	};

	const handleLogout = () => {
		const confirmLogout = window.confirm("정말 로그아웃하시겠습니까?");
		if (confirmLogout) dispatch(logout());
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
					<NavLink to="/agencies" className="nav-item">
						에이전시 목록
					</NavLink>
					<NavLink to="/favorites" className="nav-item">
						즐겨찾기
					</NavLink>
					{isAdmin && (
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
						searchTarget={searchTarget}
						setSearchTarget={setSearchTarget}
					/>
				</div>

				<div className="login-wrapper">
					{isLoggedIn ? (
						<div className="user-info">
							<img src={user.picture} alt="프로필" />
							<p>{user.name}</p>
							<Button type="login" onClick={handleLogout}>
								로그아웃
							</Button>
						</div>
					) : (
						<Button type="login" onClick={() => navigate("/login")}>
							로그인
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
