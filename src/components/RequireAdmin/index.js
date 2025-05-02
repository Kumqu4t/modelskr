import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import Loading from "../Loading";

function RequireAdmin() {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);
	const isLoading = useSelector((state) => state.user.isLoading);
	const hasNavigated = useRef(false);

	useEffect(() => {
		if (isLoading) return;

		const isAdmin = user?.email === process.env.REACT_APP_ADMIN_EMAIL;
		if (!isAdmin && !hasNavigated.current) {
			hasNavigated.current = true;
			alert("관리자만 접근 가능한 페이지입니다.");
			navigate("/");
		}
	}, [user, navigate, isLoading]);

	if (isLoading) return <Loading />;

	return <Outlet />;
}

export default RequireAdmin;
