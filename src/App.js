import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ModelListPage from "./pages/ModelListPage";
import ModelDetailPage from "./pages/ModelDetailPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ModelFormPage from "./pages/ModelFormPage";
import FavoritePage from "./pages/FavoritePage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";

function App() {
	return (
		<Provider store={store}>
			<GoogleOAuthProvider clientId="492176985275-d927cld9q853m3no1jl4n16kjkucu4n2.apps.googleusercontent.com">
				<Router>
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/favorites" element={<FavoritePage />} />
						<Route path="/models" element={<ModelListPage />} />
						<Route path="/model/:id" element={<ModelDetailPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/admin" element={<AdminPage />} />
						<Route path="/admin/edit/:id" element={<ModelFormPage />} />
						<Route path="/admin/create" element={<ModelFormPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
					<Footer />
				</Router>
			</GoogleOAuthProvider>
		</Provider>
	);
}

export default App;
