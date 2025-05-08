import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function useQueryFilters(basePath = "/models") {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);

	const [keyword, setKeyword] = useState(
		() => searchParams.get("keyword") || ""
	);
	const [gender, setGender] = useState(
		() => searchParams.get("gender") || "all"
	);
	const [role, setRole] = useState(() => searchParams.get("role") || "all");
	const [agency, setAgency] = useState(
		() => searchParams.get("agency") || "all"
	);
	const [category, setCategory] = useState(
		() => searchParams.get("category") || "all"
	);

	useEffect(() => {
		const updatedParams = new URLSearchParams(location.search);
		setKeyword(updatedParams.get("keyword") || "");
		setGender(updatedParams.get("gender") || "all");
		setRole(updatedParams.get("role") || "all");
		setAgency(updatedParams.get("agency") || "all");
		setCategory(updatedParams.get("category") || "all");
	}, [location.search]);

	useEffect(() => {
		const params = new URLSearchParams();
		if (keyword) params.set("keyword", keyword);
		if (gender !== "all") params.set("gender", gender);
		if (category !== "all") params.set("category", category);

		if (basePath === "/models" && agency !== "all")
			params.set("agency", agency);
		if (basePath === "/people" && role !== "all") params.set("role", role);

		navigate(`${basePath}?${params.toString()}`, { replace: true });
	}, [keyword, gender, role, agency, category, navigate, basePath]);

	return {
		gender,
		setGender,
		role,
		setRole,
		agency,
		setAgency,
		keyword,
		setKeyword,
		category,
		setCategory,
	};
}
