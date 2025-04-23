import React, { useEffect, useState } from "react";
import ModelForm from "../../components/ModelForm";
import { useNavigate, useParams } from "react-router-dom";

function ModelFormPage() {
	const navigate = useNavigate();
	const { id } = useParams(); // edit 모드일 경우 모델 ID 받기

	const [mode, setMode] = useState("create");
	const [model, setModel] = useState(null);
	const [agencies, setAgencies] = useState([]);

	useEffect(() => {
		if (id) {
			setMode("edit");
			const fetchModel = async () => {
				try {
					const res = await fetch(`/api/models/${id}`);
					const data = await res.json();
					setModel(data);
				} catch (err) {
					console.error("모델 불러오기 실패:", err);
				}
			};
			fetchModel();
		}
	}, [id]);

	useEffect(() => {
		const fetchAgencies = async () => {
			try {
				const res = await fetch("/api/agencies");
				const data = await res.json();
				setAgencies(data);
			} catch (err) {
				console.error("에이전시 목록 불러오기 실패:", err);
			}
		};

		fetchAgencies();
	}, []);

	const handleSubmit = async (formData) => {
		try {
			const token = localStorage.getItem("token");

			const res = await fetch(
				mode === "edit" ? `/api/models/${id}` : "/api/models",
				{
					method: mode === "edit" ? "PATCH" : "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (!res.ok) throw new Error("모델 저장 실패");

			const result = await res.json();
			navigate(`/model/${result._id}`);
		} catch (err) {
			console.error("모델 저장 중 오류:", err);
		}
	};

	return (
		<div>
			<h1> </h1>
			<ModelForm
				mode={mode}
				model={model}
				onSubmit={handleSubmit}
				agencies={agencies}
			/>
		</div>
	);
}

export default ModelFormPage;
