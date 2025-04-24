import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function FavoriteButton({ modelId, isFavorited, className, onToggle }) {
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const handleClick = async (e) => {
		e.stopPropagation();
		if (!isLoggedIn) {
			const confirmLogin = window.confirm(
				"로그인 후 즐겨찾기를 이용하실 수 있습니다. 로그인 페이지로 이동하시겠습니까?"
			);
			if (confirmLogin) {
				navigate("/login");
			}
			return;
		}

		try {
			await onToggle(modelId);
		} catch (err) {
			console.error("즐겨찾기 요청 실패:", err);
		}
	};

	return (
		<div className={className} onClick={handleClick}>
			{isFavorited ? "★" : "☆"}
		</div>
	);
}

export default FavoriteButton;
