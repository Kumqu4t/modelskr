import { useNavigate } from "react-router-dom";
import { useUsers, useTodayVisits, useRecentVisits } from "../../hooks/admins";
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
	const { data: todayVisitData, isLoading: loadingTodayVisits } =
		useTodayVisits();
	const { data: recentVisitData, isLoading: loadingRecentVisits } =
		useRecentVisits();

	if (isLoading) return <p>로딩 중...</p>;
	if (isError) return <p>유저 데이터를 불러오는 데 실패했습니다.</p>;

	return (
		<div className="admin-page">
			<h1 className="admin-title">관리자 페이지</h1>
			<div className="admin-button-row">
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

			<section className="admin-section">
				<h2>오늘 방문자 수</h2>
				{loadingTodayVisits ? (
					<p>방문자 수 로딩 중...</p>
				) : (
					<p>{todayVisitData?.count}명</p>
				)}
			</section>

			<section className="admin-section">
				<h2>최근 7일 방문자 수</h2>
				{loadingRecentVisits ? (
					<p>방문자 수 로딩 중...</p>
				) : (
					<table className="admin-table">
						<thead>
							<tr>
								<th>날짜</th>
								<th>방문자 수</th>
							</tr>
						</thead>
						<tbody>
							{recentVisitData?.map((day) => (
								<tr key={day.date}>
									<td>{day.date}</td>
									<td>{day.count}명</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</section>

			<section className="admin-section">
				<h2>유저 목록</h2>

				<table className="admin-table">
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
			</section>
		</div>
	);
}

export default AdminPage;
