import { useEffect, useState } from "react";

export function useFilters(models, selectedTags, keyword, gender, agency) {
	const [filteredModels, setFilteredModels] = useState([]);

	useEffect(() => {
		let filtered = models;

		if (gender !== "all") {
			filtered = filtered.filter((model) => model.gender === gender);
		}

		if (agency !== "all") {
			if (agency === "무소속") {
				filtered = filtered.filter((model) => model.agency === null);
			} else {
				filtered = filtered.filter((model) => model.agency?.name === agency);
			}
		}

		if (selectedTags.length > 0) {
			filtered = filtered.filter((model) =>
				selectedTags.every((tag) => model.tags.includes(tag))
			);
		}

		if (keyword) {
			filtered = filtered.filter((model) =>
				model.name.toLowerCase().includes(keyword.toLowerCase())
			);
		}

		setFilteredModels(filtered);
	}, [models, selectedTags, keyword, gender, agency]);

	return filteredModels;
}
