import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userSlice";
import "./LoginPage.css";

function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSuccess = (credentialResponse) => {
		try {
			const decoded = jwtDecode(credentialResponse.credential);
			const userInfo = {
				name: decoded.name,
				email: decoded.email,
				picture: decoded.picture,
			};

			dispatch(login(userInfo));
			navigate("/", { replace: true });
		} catch (error) {
			console.error("디코딩 실패:", error);
		}
	};

	const onFailure = (error) => {
		console.error("로그인 실패:", error);
	};

	return (
		<div className="login-page">
			<div className="login-card">
				<h1>Welcome!</h1>
				<p>Google 계정으로 로그인해주세요</p>
				<GoogleLogin onSuccess={onSuccess} onError={onFailure} />
			</div>
		</div>
	);
}

export default LoginPage;
