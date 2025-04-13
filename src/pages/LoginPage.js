import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function LoginPage() {
	const navigate = useNavigate();

	const onSuccess = (response) => {
		console.log("로그인 성공: ", response);
		// 로그인 성공 후 받은 정보 처리 (access token 등)
		navigate("/"); // 로그인 후 홈으로 리디렉션
	};

	const onFailure = (error) => {
		console.error("로그인 실패: ", error);
	};

	return (
		<div>
			<h1>구글 로그인</h1>
			<GoogleLogin
				onSuccess={onSuccess} // 성공 시 처리할 함수
				onError={onFailure} // 실패 시 처리할 함수
			/>
		</div>
	);
}

export default LoginPage;
