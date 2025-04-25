import React, { useEffect, useState } from "react";
import PeopleForm from "../../components/PeopleForm";
import PhotoForm from "../../components/PhotoForm";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL, getHeaders } from "../../api";

function FormPage() {
	const navigate = useNavigate();
	const { id, formType } = useParams();
	const [mode, setMode] = useState("create");
	const [item, setItem] = useState(null);
	const [agencies, setAgencies] = useState([]);
	const roll = formType.slice(0, -1);

	useEffect(() => {
		if (id) {
			setMode("edit");

			(async () => {
				try {
					const res = await fetch(`${API_BASE_URL}/api/${formType}/${id}`);
					const data = await res.json();
					setItem(data);
					console.log(data);
				} catch (err) {
					console.error(`${formType} 불러오기 실패:`, err);
				}
			})();
		}

		(async () => {
			try {
				const res = await fetch(`${API_BASE_URL}/api/agencies`);
				const data = await res.json();
				setAgencies(data);
			} catch (err) {
				console.error("에이전시 목록 불러오기 실패:", err);
			}
		})();
	}, [id, formType]);

	const handleSubmit = async (formData) => {
		try {
			const token = localStorage.getItem("token");
			const endpoint = id
				? `${API_BASE_URL}/api/${formType}/${id}`
				: `${API_BASE_URL}/api/${formType}`;
			const method = id ? "PATCH" : "POST";

			const res = await fetch(endpoint, {
				method,
				headers: getHeaders(token),
				body: JSON.stringify(formData),
			});

			if (!res.ok) throw new Error(`${formType} 저장 실패`);

			const result = await res.json();
			navigate(`/${formType}/${result._id}`);
		} catch (err) {
			console.error(`${formType} 저장 중 오류:`, err);
		}
	};

	return (
		<div>
			<h1> </h1>
			{formType === "photos" ? (
				<PhotoForm mode={mode} photo={item} onSubmit={handleSubmit} />
			) : (
				<PeopleForm
					mode={mode}
					item={item}
					onSubmit={handleSubmit}
					agencies={agencies}
					roll={roll}
				/>
			)}
		</div>
	);
}

export default FormPage;
