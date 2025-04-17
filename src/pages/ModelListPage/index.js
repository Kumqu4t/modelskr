import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";

function ModelListPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [selectedTags, setSelectedTags] = useState([]);
	const [filteredModels, setFilteredModels] = useState([]);

	const params = new URLSearchParams(location.search);
	const keyword = params.get("keyword") || "";
	const models = useSelector((state) => state.models.models);

	// URL => selectedTags로 동기화
	useEffect(() => {
		const tagsFromURL = new URLSearchParams(location.search).getAll("tag");
		setSelectedTags(tagsFromURL);
	}, [location.search]);

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

		navigate(`/models?${params.toString()}`, { replace: true });
	}, [selectedTags, keyword, navigate]);

	// 태그 목록 추출
	const tags = [...new Set(models.flatMap((model) => model.tags))];

	return (
		<div style={{ padding: "24px" }}>
			<FilterBar
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
				tags={tags}
			/>
			<ModelList models={filteredModels} />
		</div>
	);
}

export default ModelListPage;
