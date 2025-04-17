import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useFilters } from "../../hooks/useFilters";
import { useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar";
import ModelList from "../../components/ModelList";

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

	// tag, keyword, gender, agency 기반으로 필터링
	const filteredModels = useFilters(
		models,
		selectedTags,
		keyword,
		gender,
		agency
	);

	// 태그 목록 추출
	const tags = [...new Set(models.flatMap((model) => model.tags))];

	return (
		<div style={{ padding: "24px" }}>
			<FilterBar
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
				tags={tags}
				gender={gender}
				setGender={setGender}
				agency={agency}
				setAgency={setAgency}
			/>
			<ModelList models={filteredModels} />
		</div>
	);
}

export default ModelListPage;
