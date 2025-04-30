import { API_BASE_URL, getHeaders } from "../../api";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";
import { useFavorites } from "../../hooks/useFavorites";
import DefaultHelmet from "../../components/DefaultHelmet";
import Loading from "../../components/Loading";

function ModelListPage() {
	const {
		selectedTags,
		setSelectedTags,
		gender,
		setGender,
		agency,
		setAgency,
		keyword,
	} = useQueryFilters("/models");

	const [models, setModels] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchModels = async () => {
			try {
				const params = new URLSearchParams();
				if (gender !== "all") params.set("gender", gender);
				if (agency !== "all") params.set("agency", agency);
				selectedTags.forEach((tag) => params.append("tag", tag));
				if (keyword) params.set("keyword", keyword);

				console.log("변경감지. 새로운 params는?: ", params.toString());
				const res = await fetch(
					`${API_BASE_URL}/api/models?${params.toString()}`,
					{
						headers: getHeaders(localStorage.getItem("token")),
					}
				);
				const data = await res.json();
				console.log("변경감지. 새로운 data는?: ", data);
				setModels(data);
			} catch (err) {
				console.error("모델 데이터를 불러오기 실패:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchModels();
	}, [selectedTags, keyword, gender, agency]);

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const { favorites, toggleFavorite } = useFavorites(isLoggedIn, "Model");

	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentModels = models.slice(startIndex, startIndex + itemLimit);

	const tags = [...new Set(models.flatMap((model) => model.tags))];
	const availableTags = new Set(models.flatMap((model) => model.tags));
	const agencies = [
		...new Set(models.map((model) => model.agency?.name).filter(Boolean)),
	];
	if (models.some((model) => model.agency === null)) {
		agencies.push("무소속");
	}

	if (isLoading) return <Loading />;

	return (
		<>
			<DefaultHelmet
				title="모델 리스트"
				description="모델 리스트와 필터를 통해 원하는 모델을 찾을 수 있습니다."
			/>
			<div style={{ padding: "24px" }}>
				<h1 className="admin-title">Models</h1>
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
					type="models"
					models={currentModels}
					favorites={favorites}
					onToggleFavorite={toggleFavorite}
				/>
				<Pagination
					totalItems={models.length}
					itemLimit={itemLimit}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</>
	);
}

export default ModelListPage;
