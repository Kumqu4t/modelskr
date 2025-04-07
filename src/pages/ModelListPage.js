import { useState } from "react";
import FilterBar from "../components/FilterBar";
import ModelList from "../components/ModelList";

function ModelListPage() {
	const [query, setQuery] = useState({
		favorite: false,
		gender: null,
		keyword: "",
	});

	return (
		<div>
			<FilterBar query={query} setQuery={setQuery} />
			<ModelList query={query} />
		</div>
	);
}

export default ModelListPage;
