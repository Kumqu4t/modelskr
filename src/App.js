import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";

import HomePage from "./pages/HomePage";
import ModelListPage from "./pages/ModelListPage";
import ModelDetailPage from "./pages/ModelDetailPage";
import PhotographerListPage from "./pages/PhotographerListPage";
import PhotographerDetailPage from "./pages/PhotographerDetailPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import FormPage from "./pages/FormPage";
import AgencyListPage from "./pages/AgencyListPage";
import AgencyDetailPage from "./pages/AgencyDetailPage";
import PhotoListPage from "./pages/PhotoListPage";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import FavoritePage from "./pages/FavoritePage";
import NotFoundPage from "./pages/NotFoundPage";
import PageLayout from "./components/PageLayout/PageLayout";
import RequireAdmin from "./components/RequireAdmin";

function App() {
	return (
		<Provider store={store}>
			<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
				<Router>
					<Routes>
						<Route element={<PageLayout />}>
							<Route path="/" element={<HomePage />} />
							<Route path="/models" element={<ModelListPage />} />
							<Route path="/models/:id" element={<ModelDetailPage />} />
							<Route path="/photographers" element={<PhotographerListPage />} />
							<Route
								path="/photographers/:id"
								element={<PhotographerDetailPage />}
							/>
							<Route path="/agencies" element={<AgencyListPage />} />
							<Route path="/agencies/:id" element={<AgencyDetailPage />} />
							<Route path="/photos" element={<PhotoListPage />} />
							<Route path="/photos/:id" element={<PhotoDetailPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/favorites" element={<FavoritePage />} />
							<Route element={<RequireAdmin />}>
								<Route path="/admin" element={<AdminPage />} />
								<Route path="/admin/create/:formType" element={<FormPage />} />
								<Route
									path="/admin/edit/:formType/:id"
									element={<FormPage />}
								/>
							</Route>
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Routes>
				</Router>
			</GoogleOAuthProvider>
		</Provider>
	);
}

export default App;
