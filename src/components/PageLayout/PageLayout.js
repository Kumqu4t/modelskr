import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/user/userSlice";
import { API_BASE_URL, getHeaders } from "../../api";
import Header from "../Header";
import Footer from "../Footer";

function PageLayout() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			fetch(`${API_BASE_URL}/api/auth/me`, {
				headers: getHeaders(token),
			})
				.then((res) => res.json())
				.then((user) => dispatch(login(user)))
				.catch(() => dispatch(logout()));
		}
	}, [dispatch]);

	return (
		<div
			style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
		>
			<Header />
			<main style={{ flex: 1 }}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default PageLayout;
