import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ModelList from "../components/ModelList";

function ModelListPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [selectedTags, setSelectedTags] = useState([]);
	const [models, setModels] = useState([]);
	const [filteredModels, setFilteredModels] = useState([]);

	// URL → selectedTags로 동기화
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

	// 태그 필터링 함수
	const filterModelsByTags = (allModels, tags) => {
		if (tags.length === 0) return allModels;
		return allModels.filter((model) =>
			model.tags.some((tag) => tags.includes(tag))
		);
	};

	// 모델 필터링 및 URL 동기화
	useEffect(() => {
		const filtered = filterModelsByTags(models, selectedTags);
		setFilteredModels(filtered);

		const params = new URLSearchParams();
		selectedTags.forEach((tag) => params.append("tag", tag));
		navigate(`/models?${params.toString()}`, { replace: true });
	}, [models, selectedTags, navigate]);

	// 태그 목록 추출
	const tags = [...new Set(models.flatMap((model) => model.tags))];

	return (
		<div>
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
