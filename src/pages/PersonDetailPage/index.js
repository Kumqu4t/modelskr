import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import FavoriteButton from "../../components/FavoriteButton";
import { useFavorites } from "../../hooks/useFavorites";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";
import { usePersonById, useDeletePerson } from "../../hooks/people";
import "./PersonDetailPage.css";

function PersonDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const kind = "Person";

	const isAdmin = useSelector(
		(state) => state.user.user?.email === process.env.REACT_APP_ADMIN_EMAIL
	);

	const { data: person, isLoading, error } = usePersonById(id);
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, kind);

	const sampleImageURL =
		person?.role === "photographer"
			? "https://res.cloudinary.com/db1u4ngue/image/upload/v1747720917/modelskr/duikulw07bmohubcarwe.png"
			: person?.role === "hair"
			? "https://res.cloudinary.com/db1u4ngue/image/upload/v1747721665/modelskr/uub5czhbtxtctu2hxbx8.png"
			: "https://res.cloudinary.com/db1u4ngue/image/upload/v1747721442/modelskr/a29e70v0iet7e3hjdbfm.png";

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/admin/edit/people/${id}`);
	};

	const deletePerson = useDeletePerson();

	const handleDelete = async (e) => {
		e.stopPropagation();
		if (window.confirm("정말 삭제하시겠습니까?")) {
			deletePerson.mutate(id, {
				onSuccess: () => {
					alert("삭제되었습니다.");
					navigate("/people");
				},
				onError: () => {
					alert("삭제에 실패했습니다.");
				},
			});
		}
	};

	const handleToggleFavorite = toggleFavorite;

	if (isLoading) return <Loading />;
	if (error) return <div>{error}</div>;
	if (!person) return <div>해당 인물을 찾을 수 없습니다.</div>;

	return (
		<>
			<DefaultHelmet title={person.name} description={person.description} />
			<div className="model-detail">
				<div className="buttons-wrapper desktop-only">
					{isAdmin && (
						<div className="admin-controls-detail">
							<Button type="default" onClick={handleEdit}>
								수정
							</Button>
							<Button type="danger" onClick={handleDelete}>
								삭제
							</Button>
						</div>
					)}
					<Button
						type="default"
						onClick={() => window.open(person.contact, "_blank")}
					>
						Instagram
					</Button>
				</div>

				<div className="imageinfo-wrapper">
					<div className="image-wrapper">
						<img src={person.image?.url || sampleImageURL} alt={person.name} />
						<FavoriteButton
							modelId={person._id}
							kind={kind}
							isFavorited={favorites.some(
								(fav) => fav.item?._id === person._id
							)}
							onToggle={handleToggleFavorite}
							className={"favorite-icon detail-icon"}
						/>
					</div>
					<div className="buttons-wrapper mobile-only">
						{isAdmin && (
							<div className="admin-controls-detail">
								<Button type="default" onClick={handleEdit}>
									수정
								</Button>
								<Button type="danger" onClick={handleDelete}>
									삭제
								</Button>
							</div>
						)}
						<Button
							type="default"
							onClick={() => window.open(person.contact, "_blank")}
						>
							Instagram
						</Button>
					</div>

					<div className="model-detail-info">
						<h2>{person.name}</h2>
						<p>{person.description}</p>
						<p>
							<strong>직업:</strong>{" "}
							<span
								className="filter-button"
								onClick={() => navigate(`/people?role=${person.role}`)}
							>
								{person.role}
							</span>
						</p>
						<p>
							<strong>성별:</strong>{" "}
							<span
								className="filter-button"
								onClick={() => navigate(`/people?gender=${person.gender}`)}
							>
								{person.gender}
							</span>
						</p>
						<p>
							<strong>에이전시:</strong>{" "}
							{person.agency?.name ? (
								<span
									className="filter-button"
									onClick={() =>
										navigate(
											`/agencies/${encodeURIComponent(person.agency._id)}`
										)
									}
								>
									{person.agency.name}
								</span>
							) : (
								<span className="filter-button disabled">무소속</span>
							)}
						</p>
						{person.birthYear && (
							<p>
								<strong>출생년도:</strong> {person.birthYear}
							</p>
						)}
						{person.nationality && (
							<p>
								<strong>국적:</strong> {person.nationality}
							</p>
						)}
					</div>
				</div>
				<div className="recent-work-list">
					<h3>최근 활동</h3>
					{person.recentWork.map((item, index) => (
						<div key={index} className="recent-work-item">
							<strong>[{item.type}]</strong>{" "}
							<a href={item.link} target="_blank" rel="noopener noreferrer">
								{item.title}
							</a>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default PersonDetailPage;
