import DefaultHelmet from "../../components/DefaultHelmet";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";
import { useFavorites } from "../../hooks/useFavorites";
import { API_BASE_URL, getHeaders } from "../../api";
import Loading from "../../components/Loading";

function PhotographerListPage() {
	const {
		selectedTags,
		setSelectedTags,
		gender,
		setGender,
		agency,
		setAgency,
		keyword,
	} = useQueryFilters("/photographers");
	const [photographers, setPhotographers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPhotographers = async () => {
			try {
				const params = new URLSearchParams();
				if (gender !== "all") params.set("gender", gender);
				if (agency !== "all") params.set("agency", agency);
				selectedTags.forEach((tag) => params.append("tag", tag));
				if (keyword) params.set("keyword", keyword);

				const res = await fetch(
					`${API_BASE_URL}/api/photographers?${params.toString()}`,
					{
						headers: getHeaders(localStorage.getItem("token")),
					}
				);
				const data = await res.json();
				setPhotographers(data);
			} catch (err) {
				console.error("작가 데이터를 불러오기 실패:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPhotographers();
	}, [selectedTags, keyword, gender, agency]);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(
		isLoggedIn,
		"Photographer"
	);

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentPhotographers = photographers.slice(
		startIndex,
		startIndex + itemLimit
	);

	const tags = [
		...new Set(photographers.flatMap((photographers) => photographers.tags)),
	];
	const availableTags = new Set(
		photographers.flatMap((photographers) => photographers.tags)
	);
	const agencies = [
		...new Set(
			photographers
				.map((photographers) => photographers.agency?.name)
				.filter(Boolean)
		),
	];
	if (photographers.some((photographer) => photographer.agency === null)) {
		agencies.push("무소속");
	}

	if (isLoading) return <Loading />;

	return (
		<>
			<DefaultHelmet
				title="포토그래퍼 리스트"
				description="포토그래퍼 리스트와 필터를 통해 원하는 포토그래퍼를 찾을 수 있습니다."
			/>
			<div style={{ padding: "24px" }}>
				<h1 className="admin-title">Photographers</h1>
				<FilterBar
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
					tags={tags}
					availableTags={availableTags}
					gender={gender}
					setGender={setGender}
					agency={agency}
					setAgency={setAgency}
					agencies={agencies}
				/>
				<ModelList
					type="photographers"
					models={currentPhotographers}
					favorites={favorites}
					onToggleFavorite={toggleFavorite}
				/>
				<Pagination
					totalItems={photographers.length}
					itemLimit={itemLimit}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</>
	);
}

export default PhotographerListPage;
