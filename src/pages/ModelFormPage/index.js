import React, { useEffect, useState } from "react";
import ModelForm from "../../components/ModelForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addModel, updateModel } from "../../redux/models/modelsSlice";

function ModelFormPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams(); // edit 모드일 경우 모델 ID 받기
	const model = useSelector((state) =>
		state.models.models.find((model) => model.id === parseInt(id))
	); // 수정 모드일 때 모델 데이터 가져오기

	const [mode, setMode] = useState("create");

	useEffect(() => {
		if (id) {
			setMode("edit"); // id가 있으면 수정 모드
		}
	}, [id]);

	const handleSubmit = (formData) => {
		if (mode === "edit") {
			// 수정일 경우
			dispatch(updateModel(formData));
		} else {
			// 추가일 경우
			dispatch(addModel(formData));
		}
		navigate("/admin"); // 작업 후 모델 목록 페이지로 이동
	};

	return (
		<div>
			<h1>{mode === "edit" ? "모델 수정" : "모델 추가"}</h1>
			<ModelForm mode={mode} model={model} onSubmit={handleSubmit} />
		</div>
	);
}

export default ModelFormPage;
