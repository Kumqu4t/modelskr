import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function useQueryFilters(basePath = "models") {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);

	// ⬇️ location.search가 바뀌면 다시 읽어오게끔 처리
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

	// 💡 location.search가 바뀌었을 때도 상태를 업데이트
	useEffect(() => {
		const updatedParams = new URLSearchParams(location.search);
		setSelectedTags(updatedParams.getAll("tag"));
		setKeyword(updatedParams.get("keyword") || "");
		setGender(updatedParams.get("gender") || "all");
		setAgency(updatedParams.get("agency") || "all");
	}, [location.search]);

	// URL 동기화
	useEffect(() => {
		const params = new URLSearchParams();
		selectedTags.forEach((tag) => params.append("tag", tag));
		if (keyword) params.set("keyword", keyword);
		if (gender !== "all") params.set("gender", gender);
		if (agency !== "all") params.set("agency", agency);

		navigate(`${basePath}?${params.toString()}`);
	}, [selectedTags, keyword, gender, agency, navigate, basePath]);

	return {
		selectedTags,
		setSelectedTags,
		gender,
		setGender,
		agency,
		setAgency,
		keyword,
		setKeyword,
	};
}
