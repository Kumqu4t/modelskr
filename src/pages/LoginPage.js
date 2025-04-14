import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../redux/user/userSlice";

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

			dispatch(login(userInfo)); // Redux에 로그인 정보 저장
			navigate("/");
		} catch (error) {
			console.error("디코딩 실패:", error);
		}
	};

	const onFailure = (error) => {
		console.error("로그인 실패:", error);
	};

	return (
		<div style={{ textAlign: "center", marginTop: "100px" }}>
			<h1>구글 로그인</h1>
			<GoogleLogin onSuccess={onSuccess} onError={onFailure} />
		</div>
	);
}

export default LoginPage;
