import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./AdminPage.css";

function AdminPage() {
	const navigate = useNavigate();

	return (
		<div className="admin-page">
			<h1 className="admin-title">관리자 페이지</h1>
			<div
				style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}
			>
				<Button type="default" onClick={() => navigate("/admin/create/models")}>
					+ 모델 추가
				</Button>
				<Button type="default" onClick={() => navigate("/admin/create/photos")}>
					+ 사진 추가
				</Button>
			</div>
		</div>
	);
}

export default AdminPage;
