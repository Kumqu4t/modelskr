import React, { useState, useEffect, useRef } from "react";
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const mobileMenuRef = useRef(null);
	const [isMobilePhotosOpen, setIsMobilePhotosOpen] = useState(false);
	const [isMobileProfilesOpen, setIsMobileProfilesOpen] = useState(false);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const user = useSelector((state) => state.user.user);
	const isAdmin = user?.email === "qufgkswkfl3@gmail.com";

	const isProfilesActive =
		location.pathname.startsWith("/models") ||
		location.pathname.startsWith("/people") ||
		location.pathname.startsWith("/agencies");
	const isPhotosActive = location.pathname.startsWith("/photos");
	const [currentCategory, setCurrentCategory] = useState("");
	const [currentRole, setCurrentRole] = useState("");

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		setCurrentCategory(searchParams.get("category") || "");
		setCurrentRole(searchParams.get("role") || "");
	}, [location.search]);

	useEffect(() => {
		if (
			location.pathname.startsWith("/models") ||
			location.pathname.startsWith("/people") ||
			location.pathname.startsWith("/agencies")
		) {
			setIsMobileProfilesOpen(true);
		} else {
			setIsMobileProfilesOpen(false);
		}

		if (location.pathname.startsWith("/photos")) {
			setIsMobilePhotosOpen(true);
		} else {
			setIsMobilePhotosOpen(false);
		}

		setIsMenuOpen(false);
	}, [location.pathname, currentCategory]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			const hamburgerBtn = document.querySelector(".hamburger");
			if (
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(e.target) &&
				!hamburgerBtn.contains(e.target)
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen]);

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
					<img src={user.picture} alt="프로필" className="user-picture" />
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
		<header className="header-fixed">
			<button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
				☰
			</button>

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
						<button
							className="dropdown-button"
							onClick={() => navigate("/models")}
						>
							PROFILES
						</button>
						{(isProfilesDropdownOpen || isProfilesActive) && (
							<div className="dropdown-content">
								<NavLink to="/models" className="nav-item">
									Models
								</NavLink>
								<Link
									to="/people?role=photographer"
									className={`nav-item ${
										currentRole === "photographer" ? "active" : ""
									}`}
								>
									Photographer
								</Link>
								<Link
									to="/people?role=hair"
									className={`nav-item ${
										currentRole === "hair" ? "active" : ""
									}`}
								>
									Hair
								</Link>
								<Link
									to="/people?role=makeup"
									className={`nav-item ${
										currentRole === "makeup" ? "active" : ""
									}`}
								>
									Makeup
								</Link>
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
				<NavLink to="/admin" className="nav-item admin-link">
					관리
				</NavLink>
			)}

			{/* 모바일 */}
			{isMenuOpen && (
				<div className="mobile-menu" ref={mobileMenuRef}>
					<SearchBar
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						onSubmit={handleSubmit}
						searchTarget={searchTarget}
						setSearchTarget={setSearchTarget}
					/>
					<button onClick={() => setIsMobilePhotosOpen((prev) => !prev)}>
						Photos
					</button>
					{isMobilePhotosOpen && (
						<div className="mobile-submenu">
							<Link
								to="/photos?category=commercial"
								className={`mobile-nav-item ${
									currentCategory === "commercial" ? "active" : ""
								}`}
							>
								Commercial
							</Link>
							<Link
								to="/photos?category=editorial"
								className={`mobile-nav-item ${
									currentCategory === "editorial" ? "active" : ""
								}`}
							>
								Editorial
							</Link>
							<Link
								to="/photos?category=others"
								className={`mobile-nav-item ${
									currentCategory === "others" ? "active" : ""
								}`}
							>
								Others
							</Link>
						</div>
					)}
					<button onClick={() => setIsMobileProfilesOpen((prev) => !prev)}>
						Profiles
					</button>
					{isMobileProfilesOpen && (
						<div className="mobile-submenu">
							<NavLink to="/models" className="mobile-nav-item">
								Models
							</NavLink>
							<Link
								to="/people?role=photographer"
								className={`mobile-nav-item ${
									currentRole === "photographer" ? "active" : ""
								}`}
							>
								Photographer
							</Link>
							<Link
								to="/people?role=hair"
								className={`mobile-nav-item ${
									currentRole === "hair" ? "active" : ""
								}`}
							>
								Hair
							</Link>
							<Link
								to="/people?role=makeup"
								className={`mobile-nav-item ${
									currentRole === "makeup" ? "active" : ""
								}`}
							>
								Makeup
							</Link>
							<NavLink to="/agencies" className="mobile-nav-item">
								Agencies
							</NavLink>
						</div>
					)}
					{isLoggedIn && (
						<div className="mobile-userbox">
							<NavLink to="/favorites" className="mobile-nav-item">
								favorites
							</NavLink>
							<Button type="login" onClick={handleLogout}>
								로그아웃
							</Button>
						</div>
					)}
					{!isLoggedIn && (
						<Button type="login" onClick={() => navigate("/login")}>
							로그인
						</Button>
					)}
					{isAdmin && <NavLink to="/admin">관리</NavLink>}
				</div>
			)}
		</header>
	);
}

export default Header;
