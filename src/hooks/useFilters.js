import { useEffect, useState } from "react";

export function useFilters(models, keyword, gender, agency) {
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

		if (keyword) {
			filtered = filtered.filter((model) =>
				model.name.toLowerCase().includes(keyword.toLowerCase())
			);
		}

		setFilteredModels(filtered);
	}, [models, keyword, gender, agency]);

	return filteredModels;
}
