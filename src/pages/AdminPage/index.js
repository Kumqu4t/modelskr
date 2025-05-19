import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/admins/useUsers";
import Button from "../../components/Button";
import ClearCacheButton from "../../components/ClearCacheButton";
import "./AdminPage.css";

function AdminPage() {
	const navigate = useNavigate();
	const {
		data: users,
		isLoading,
		isError,
	} = useUsers({ fields: "email,name" });

	if (isLoading) return <p>로딩 중...</p>;
	if (isError) return <p>유저 데이터를 불러오는 데 실패했습니다.</p>;

	return (
		<div className="admin-page">
			<h1 className="admin-title">관리자 페이지</h1>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "24px",
					gap: "12px",
				}}
			>
				<Button type="default" onClick={() => navigate("/admin/create/models")}>
					+ 모델 추가
				</Button>
				<Button type="default" onClick={() => navigate("/admin/create/people")}>
					+ 인물 추가
				</Button>
				<Button
					type="default"
					onClick={() => navigate("/admin/create/agencies")}
				>
					+ 에이전시 추가
				</Button>
				<Button type="default" onClick={() => navigate("/admin/create/photos")}>
					+ 사진 추가
				</Button>
				<ClearCacheButton />
			</div>
			<table
				style={{
					display: "flex",
					flexDirection: "column",
					marginTop: "24px",
					gap: "12px",
				}}
			>
				<thead>
					<tr>
						<th>이름</th>
						<th>이메일</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AdminPage;
