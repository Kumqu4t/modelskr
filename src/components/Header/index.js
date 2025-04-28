import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import SearchBar from "../SearchBar";
import Button from "../Button";
import "./Header.css";

function Header() {
	const [keyword, setKeyword] = useState("");
	const [searchTarget, setSearchTarget] = useState("models");
	const [isProfilesDropdownOpen, setIsProfilesDropdownOpen] = useState(false);
	const [isPhotosDropdownOpen, setIsPhotosDropdownOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const user = useSelector((state) => state.user.user);
	const isAdmin = user?.email === "qufgkswkfl3@gmail.com";

	const isProfilesActive =
		location.pathname.startsWith("/models") ||
		location.pathname.startsWith("/photographers") ||
		location.pathname.startsWith("/agencies");
	const isPhotosActive = location.pathname.startsWith("/photos");
	const [currentCategory, setCurrentCategory] = useState("");

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		setCurrentCategory(searchParams.get("category") || "");
	}, [location.search]);

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
		if (window.confirm("정말 로그아웃하시겠습니까?")) {
			localStorage.removeItem("token");
			dispatch(logout());
			navigate("/");
		}
	};

	const renderUserActions = () => {
		if (isLoggedIn) {
			return (
				<div className="user-info">
					<img src={user.picture} alt="프로필" />
					<p>{user.name}</p>
					<Button type="login" onClick={handleLogout}>
						로그아웃
					</Button>
				</div>
			);
		} else {
			return (
				<Button type="login" onClick={() => navigate("/login")}>
					로그인
				</Button>
			);
		}
	};

	return (
		<header>
			<div className="header-inner">
				<Link to="/" className="logo">
					Models.kr
				</Link>

				<nav className="nav-links">
					<div
						className={`dropdown ${isPhotosActive ? "active" : ""}`}
						onMouseEnter={() => setIsPhotosDropdownOpen(true)}
						onMouseLeave={() => setIsPhotosDropdownOpen(false)}
					>
						<button
							className="dropdown-button"
							onClick={() => navigate("/photos")}
						>
							PHOTOS
						</button>
						{(isPhotosDropdownOpen || isPhotosActive) && (
							<div className="dropdown-content">
								<Link
									to="/photos?category=commercial"
									className={`nav-item ${
										currentCategory === "commercial" ? "active" : ""
									}`}
								>
									Commercial
								</Link>
								<Link
									to="/photos?category=editorial"
									className={`nav-item ${
										currentCategory === "editorial" ? "active" : ""
									}`}
								>
									Editorial
								</Link>
								<Link
									to="/photos?category=others"
									className={`nav-item ${
										currentCategory === "others" ? "active" : ""
									}`}
								>
									Others
								</Link>
							</div>
						)}
					</div>
					<div
						className={`dropdown ${isProfilesActive ? "active" : ""}`}
						onMouseEnter={() => setIsProfilesDropdownOpen(true)}
						onMouseLeave={() => setIsProfilesDropdownOpen(false)}
					>
						<button className="dropdown-button">PROFILES</button>
						{(isProfilesDropdownOpen || isProfilesActive) && (
							<div className="dropdown-content">
								<NavLink to="/models" className="nav-item">
									Models
								</NavLink>
								<NavLink to="/photographers" className="nav-item">
									Photographers
								</NavLink>
								<NavLink to="/agencies" className="nav-item">
									Agencies
								</NavLink>
							</div>
						)}
					</div>
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
					<NavLink to="/favorites" className="nav-item">
						☆
					</NavLink>
					{renderUserActions()}
				</div>
			</div>

			{isAdmin && (
				<NavLink to="/admin" className="nav-item">
					관리
				</NavLink>
			)}
		</header>
	);
}

export default Header;
