import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RequireLogin({ children }) {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const navigate = useNavigate();
	const hasNavigated = useRef(false);

	useEffect(() => {
		if (isLoggedIn === false && !hasNavigated.current) {
			hasNavigated.current = true;
			alert("로그인 후 이용해주세요.");
			navigate("/login");
		}
	}, [isLoggedIn, navigate]);

	if (isLoggedIn === null) return null;
	if (isLoggedIn === false) return null;

	return children;
}

export default RequireLogin;
