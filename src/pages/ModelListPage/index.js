import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useFilters } from "../../hooks/useFilters";
import { useSelector } from "react-redux";
import { useState } from "react";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";
import Pagination from "../../components/Pagination";

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
	const models = useSelector((state) => state.models.models);

	const filteredModels = useFilters(
		models,
		selectedTags,
		keyword,
		gender,
		agency
	);

	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const itemLimit = 8;
	const startIndex = (currentPage - 1) * itemLimit;
	const currentModels = filteredModels.slice(
		startIndex,
		startIndex + itemLimit
	);

	// 태그 목록 추출
	const tags = [...new Set(models.flatMap((model) => model.tags))];

	return (
		<div style={{ padding: "24px" }}>
			<h1 className="admin-title">Models</h1>
			<FilterBar
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
				tags={tags}
				gender={gender}
				setGender={setGender}
				agency={agency}
				setAgency={setAgency}
			/>
			<ModelList models={currentModels} />
			<Pagination
				totalItems={filteredModels.length}
				itemLimit={itemLimit}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}

export default ModelListPage;
