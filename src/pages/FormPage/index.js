import React, { useEffect, useState } from "react";
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
		enabled: formType === "models",
	});
	const { data: agencyData } = useAgencyById(id, {
		enabled: formType === "agencies",
	});
	const { data: photographerData } = usePhotographerById(id, {
		enabled: formType === "photographers",
	});
	const { data: photoData } = usePhotoById(id, {
		enabled: formType === "photos",
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

	useEffect(() => {
		if (id) {
			setMode("edit");

			let data;
			if (formType === "models") {
				data = modelData;
			} else if (formType === "agencies") {
				data = agencyData;
			} else if (formType === "photographers") {
				data = photographerData;
			} else if (formType === "photos") {
				data = photoData;
			}

			setItem(data);
			console.log(data);
		}

		if (agenciesData) {
			setAgencies(agenciesData);
		}
	}, [
		id,
		formType,
		modelData,
		agencyData,
		photographerData,
		photoData,
		agenciesData,
	]);

	const handleSubmit = (formData) => {
		let mutation;

		if (formType === "models") {
			mutation = id ? updateModel : createModel;
		} else if (formType === "agencies") {
			mutation = id ? updateAgency : createAgency;
		} else if (formType === "photographers") {
			mutation = id ? updatePhotographer : createPhotographer;
		} else if (formType === "photos") {
			mutation = id ? updatePhoto : createPhoto;
		}

		if (!mutation) {
			console.error("지원되지 않는 formType입니다.");
			return;
		}

		const variables = id ? { id, data: formData } : formData;

		mutation.mutate(variables, {
			onSuccess: (result) => {
				navigate(`/${formType}/${result._id}`);
			},
			onError: (err) => {
				console.error(`${formType} 저장 중 오류:`, err);
			},
		});
	};

	return (
		<div>
			<h1> </h1>
			{formType === "photos" ? (
				<PhotoForm mode={mode} photo={item} onSubmit={handleSubmit} />
			) : formType === "agencies" ? (
				<AgencyForm mode={mode} item={item} onSubmit={handleSubmit} />
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
