import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ModelListPage from "./pages/ModelListPage";
import ModelDetailPage from "./pages/ModelDetailPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import FavoritePage from "./pages/FavoritePage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";
import { useState, useEffect } from "react"; // 즐겨찾기 상태 관리용

function App() {
	// 즐겨찾기 임시. 추후 백엔드 연결 시 변경.
	const [favorites, setFavorites] = useState(() => {
		const stored = localStorage.getItem("favorites");
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/favorites"
					element={
						<FavoritePage favorites={favorites} setFavorites={setFavorites} />
					}
				/>
				<Route
					path="/models"
					element={
						<ModelListPage favorites={favorites} setFavorites={setFavorites} />
					}
				/>
				<Route
					path="/model/:id"
					element={
						<ModelDetailPage
							favorites={favorites}
							setFavorites={setFavorites}
						/>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/admin" element={<AdminPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
