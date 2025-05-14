import ModelCard from "../ModelCard";
import "./ModelList.css";

function ModelList({ type, models, favorites = [], onToggleFavorite }) {
	if (models.length === 0) {
		return (
			<div
				style={{
					height: "70vh",
					textAlign: "center",
					marginTop: "40px",
				}}
			>
				검색 결과가 없습니다.
			</div>
		);
	}

	return (
		<div className="model-card-container">
			{models.map((model) => (
				<ModelCard
					key={model._id}
					type={type}
					model={model}
					isFavorited={favorites.some((fav) => fav.item?._id === model._id)}
					onToggleFavorite={onToggleFavorite}
				/>
			))}
		</div>
	);
}

export default ModelList;
