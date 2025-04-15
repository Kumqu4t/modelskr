import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ModelList from "../components/ModelList";

function AdminPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [selectedTags, setSelectedTags] = useState([]);
	const [models, setModels] = useState([]);
	const [filteredModels, setFilteredModels] = useState([]);

	const params = new URLSearchParams(location.search);
	const keyword = params.get("keyword") || "";

	// URL => selectedTags로 동기화
	useEffect(() => {
		const tagsFromURL = new URLSearchParams(location.search).getAll("tag");
		setSelectedTags(tagsFromURL);
	}, [location.search]);

	// 데이터 fetch
	useEffect(() => {
		fetch("/mock/models.json")
			.then((res) => res.json())
			.then((data) => setModels(data));
	}, []);

	// tag, keyword 기반으로 필터링
	useEffect(() => {
		let filtered = models;

		if (selectedTags.length > 0) {
			filtered = filtered.filter((model) =>
				model.tags.some((tag) => selectedTags.includes(tag))
			);
		}

		if (keyword) {
			filtered = filtered.filter((model) =>
				model.name.toLowerCase().includes(keyword.toLowerCase())
			);
		}

		setFilteredModels(filtered);
	}, [models, selectedTags, keyword]);

	// keyword, tag => URL 동기화
	useEffect(() => {
		const params = new URLSearchParams();

		selectedTags.forEach((tag) => params.append("tag", tag));
		if (keyword) params.set("keyword", keyword); // 검색어가 있으면 같이 추가

		navigate(`/admin?${params.toString()}`, { replace: true });
	}, [selectedTags, keyword, navigate]);

	// 태그 목록 추출
	const tags = [...new Set(models.flatMap((model) => model.tags))];

	return (
		<div>
			<FilterBar
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
				tags={tags}
			/>
			<button onClick={() => navigate("/admin/create")}>+ 모델 추가</button>
			<ModelList models={filteredModels} />
		</div>
	);
}

export default AdminPage;
