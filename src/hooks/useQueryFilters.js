import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function useQueryFilters(basePath = "models") {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);

	const [selectedTags, setSelectedTags] = useState(() =>
		searchParams.getAll("tag")
	);
	const [keyword, setKeyword] = useState(
		() => searchParams.get("keyword") || ""
	);
	const [gender, setGender] = useState(
		() => searchParams.get("gender") || "all"
	);
	const [agency, setAgency] = useState(
		() => searchParams.get("agency") || "all"
	);
	const [category, setCategory] = useState(
		() => searchParams.get("category") || "all"
	);

	useEffect(() => {
		const updatedParams = new URLSearchParams(location.search);
		setSelectedTags(updatedParams.getAll("tag"));
		setKeyword(updatedParams.get("keyword") || "");
		setGender(updatedParams.get("gender") || "all");
		setAgency(updatedParams.get("agency") || "all");
		setCategory(updatedParams.get("category") || "all");
	}, [location.search]);

	// 태그 등 필터링 시 URL 동기화
	useEffect(() => {
		const params = new URLSearchParams();
		selectedTags.forEach((tag) => params.append("tag", tag));
		if (keyword) params.set("keyword", keyword);
		if (gender !== "all") params.set("gender", gender);
		if (agency !== "all") params.set("agency", agency);
		if (category !== "all") params.set("category", category);

		navigate(`${basePath}?${params.toString()}`, { replace: true });
	}, [selectedTags, keyword, gender, agency, category, navigate, basePath]);

	return {
		selectedTags,
		setSelectedTags,
		gender,
		setGender,
		agency,
		setAgency,
		keyword,
		setKeyword,
		category,
		setCategory,
	};
}
