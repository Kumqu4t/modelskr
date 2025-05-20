import { useNavigate } from "react-router-dom";
import { getCloudinaryThumbnail } from "../../utils/getCloudinaryThumbnail";
import FavoriteButton from "../FavoriteButton";
import "./ModelCard.css";

function ModelCard({ type, model, isFavorited, onToggleFavorite }) {
	const { _id: id, name, image } = model;
	const navigate = useNavigate();

	const handleCardClick = () => navigate(`/${type}/${id}`);
	const sampleImageURL =
		type !== "people"
			? ""
			: model?.role === "photographer"
			? "https://res.cloudinary.com/db1u4ngue/image/upload/v1747720917/modelskr/duikulw07bmohubcarwe.png"
			: model?.role === "hair"
			? "https://res.cloudinary.com/db1u4ngue/image/upload/v1747721665/modelskr/uub5czhbtxtctu2hxbx8.png"
			: model?.role === "makeup"
			? "https://res.cloudinary.com/db1u4ngue/image/upload/v1747721442/modelskr/a29e70v0iet7e3hjdbfm.png"
			: "";

	return (
		<div className="model-card" onClick={handleCardClick}>
			<div className="image-wrapper">
				<img
					src={getCloudinaryThumbnail(image?.url || sampleImageURL)}
					alt={name}
					loading="lazy"
				/>
				<FavoriteButton
					modelId={id}
					kind={type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)}
					isFavorited={isFavorited}
					onToggle={onToggleFavorite}
					className="favorite-icon card-icon"
				/>
			</div>
			<h3 className="model-name">{name}</h3>
			{/* <p className="model-description">{description}</p> */}
		</div>
	);
}

export default ModelCard;
