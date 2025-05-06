import React, { useEffect, useState, useMemo } from "react";
import PeopleForm from "../../components/PeopleForm";
import PhotoForm from "../../components/PhotoForm";
import AgencyForm from "../../components/AgencyForm";
import { useNavigate, useParams } from "react-router-dom";
import {
	useModelById,
	useCreateModel,
	useUpdateModel,
} from "../../hooks/models";
import {
	useAgencies,
	useAgencyById,
	useCreateAgency,
	useUpdateAgency,
} from "../../hooks/agencies";
import {
	usePhotographerById,
	useCreatePhotographer,
	useUpdatePhotographer,
} from "../../hooks/photographers";
import {
	useCreatePhoto,
	useUpdatePhoto,
	usePhotoById,
} from "../../hooks/photos";

function FormPage() {
	const navigate = useNavigate();
	const { id, formType } = useParams();
	const [mode, setMode] = useState("create");
	const [item, setItem] = useState(null);
	const [agencies, setAgencies] = useState([]);
	const roll = formType.slice(0, -1);

	const { data: modelData } = useModelById(id, {
		enabled: formType === "models" && !!id,
	});
	const { data: agencyData } = useAgencyById(id, {
		enabled: formType === "agencies" && !!id,
	});
	const { data: photographerData } = usePhotographerById(id, {
		enabled: formType === "photographers" && !!id,
	});
	const { data: photoData } = usePhotoById(id, {
		enabled: formType === "photos" && !!id,
	});
	const { data: agenciesData } = useAgencies({});
	const createModel = useCreateModel();
	const updateModel = useUpdateModel();
	const createAgency = useCreateAgency();
	const updateAgency = useUpdateAgency();
	const createPhotographer = useCreatePhotographer();
	const updatePhotographer = useUpdatePhotographer();
	const createPhoto = useCreatePhoto();
	const updatePhoto = useUpdatePhoto();

	const entityMap = useMemo(
		() => ({
			models: {
				data: modelData,
				create: createModel,
				update: updateModel,
				component: PeopleForm,
				props: { agencies, roll },
			},
			agencies: {
				data: agencyData,
				create: createAgency,
				update: updateAgency,
				component: AgencyForm,
				props: {},
			},
			photographers: {
				data: photographerData,
				create: createPhotographer,
				update: updatePhotographer,
				component: PeopleForm,
				props: { agencies, roll },
			},
			photos: {
				data: photoData,
				create: createPhoto,
				update: updatePhoto,
				component: PhotoForm,
				props: {},
			},
		}),
		[
			modelData,
			createModel,
			updateModel,
			agencies,
			roll,
			agencyData,
			createAgency,
			updateAgency,
			photographerData,
			createPhotographer,
			updatePhotographer,
			photoData,
			createPhoto,
			updatePhoto,
		]
	);

	useEffect(() => {
		if (id) {
			setMode("edit");
			const data = entityMap[formType]?.data;
			setItem(data);
		}

		if (agenciesData) {
			setAgencies(agenciesData);
		}
	}, [id, formType, agenciesData, entityMap]);

	const handleSubmit = (formData) => {
		const mutation = id
			? entityMap[formType]?.update
			: entityMap[formType]?.create;

		if (!mutation) {
			console.error("지원되지 않는 formType입니다.");
			return;
		}

		const variables = id ? { id, data: formData } : formData;

		mutation.mutate(variables, {
			onSuccess: (result) => navigate(`/${formType}/${result._id}`),
			onError: (err) => console.error(`${formType} 저장 중 오류:`, err),
		});
	};

	const FormComponent = entityMap[formType]?.component;

	return (
		<div>
			<h1> </h1>
			{FormComponent && (
				<FormComponent
					mode={mode}
					{...(formType === "photos" ? { photo: item } : { item })}
					onSubmit={handleSubmit}
					{...entityMap[formType].props}
				/>
			)}
		</div>
	);
}

export default FormPage;
