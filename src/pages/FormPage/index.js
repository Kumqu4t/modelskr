import React, { useEffect, useState } from "react";
import ModelForm from "../../components/ModelForm";
import PhotoForm from "../../components/PhotoForm";
import { useNavigate, useParams } from "react-router-dom";

function FormPage() {
	const navigate = useNavigate();
	const { id, formType } = useParams();
	const [mode, setMode] = useState("create");
	const [item, setItem] = useState(null);
	const [agencies, setAgencies] = useState([]);

	useEffect(() => {
		if (id) {
			setMode("edit");

			(async () => {
				try {
					const res = await fetch(`/api/${formType}/${id}`);
					const data = await res.json();
					setItem(data);
				} catch (err) {
					console.error(`${formType} 불러오기 실패:`, err);
				}
			})();
		}

		(async () => {
			try {
				const res = await fetch("/api/agencies");
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
			const endpoint = id ? `/api/${formType}/${id}` : `/api/${formType}`;
			const method = id ? "PATCH" : "POST";

			const res = await fetch(endpoint, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
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
			{formType === "models" ? (
				<ModelForm
					mode={mode}
					model={item}
					onSubmit={handleSubmit}
					agencies={agencies}
				/>
			) : (
				<PhotoForm mode={mode} photo={item} onSubmit={handleSubmit} />
			)}
		</div>
	);
}

export default FormPage;
