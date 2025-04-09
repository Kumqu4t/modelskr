import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import ModelList from "../components/ModelList";

function ModelListPage() {
	const [selectedTags, setSelectedTags] = useState([]);
	const [models, setModels] = useState([]);
	const [filteredModels, setFilteredModels] = useState([]);

	useEffect(() => {
		fetch("/mock/models.json")
			.then((res) => res.json())
			.then((data) => setModels(data));
	}, []);

	useEffect(() => {
		if (selectedTags.length === 0) {
			setFilteredModels(models);
			return;
		}

		const filtered = models.filter((model) =>
			model.tags.some((tag) => selectedTags.includes(tag))
		);
		setFilteredModels(filtered);
	}, [models, selectedTags]);

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
