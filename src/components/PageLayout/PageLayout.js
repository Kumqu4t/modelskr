import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import Header from "../Header";
import Footer from "../Footer";

function PageLayout() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
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
