import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userSlice";
import { API_BASE_URL, getHeaders } from "../../api";
import Loading from "../../components/Loading";
import "./LoginPage.css";

function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const onSuccess = async (credentialResponse) => {
		try {
			setIsLoggingIn(true);
			const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
				method: "POST",
				headers: getHeaders(),
				body: JSON.stringify({ token: credentialResponse.credential }),
			});

			const { token, user } = await res.json();

			localStorage.setItem("token", token);
			dispatch(login(user));
			navigate("/", { replace: true });
		} catch (error) {
			console.error("로그인 실패:", error);
		} finally {
			setIsLoggingIn(false);
		}
	};

	const onFailure = (error) => {
		console.error("로그인 실패:", error);
	};

	return (
		<div className="login-page">
			{isLoggingIn ? (
				<Loading />
			) : (
				<div className="login-card">
					<h1>Welcome!</h1>
					<p>Google 계정으로 로그인해주세요</p>
					<GoogleLogin onSuccess={onSuccess} onError={onFailure} />
				</div>
			)}
		</div>
	);
}

export default LoginPage;
