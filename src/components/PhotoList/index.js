import { useNavigate } from "react-router-dom";
import { getCloudinaryThumbnail } from "../../utils/getCloudinaryThumbnail";
import "./PhotoList.css";

function PhotoList({ photos }) {
	const navigate = useNavigate();

	if (!photos || photos.length === 0) {
		return <div>사진이 없습니다.</div>;
	}

	return (
		<div className="photos-page">
			<div className="photos-grid">
				{photos.map((photo) => (
					<div
						className="photo-card"
						key={photo._id}
						onClick={() => navigate(`/photos/${photo._id}`)}
					>
						<img
							src={getCloudinaryThumbnail(
								photo.images?.[0].url,
								600,
								800,
								"limit"
							)}
							alt={photo.title}
						/>
						<h3>{photo.title}</h3>
					</div>
				))}
			</div>
		</div>
	);
}

export default PhotoList;
