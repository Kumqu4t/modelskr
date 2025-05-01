import React from "react";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { usePhotos } from "../../hooks/photos/usePhotos";
import DefaultHelmet from "../../components/DefaultHelmet";
import PhotoList from "../../components/PhotoList";
import Loading from "../../components/Loading";
import "./PhotoListPage.css";

const PhotoListPage = () => {
	const { keyword, category } = useQueryFilters("/photos");

	const {
		data: photos = [],
		isLoading,
		error,
	} = usePhotos({
		category,
		keyword,
		fields: "images,title,_id",
	});

	if (isLoading) return <Loading />;
	if (photos.length === 0) return <div>사진이 없습니다.</div>;
	if (error) return <div>{error}</div>;

	return (
		<>
			<DefaultHelmet
				title="사진 리스트"
				description="다양한 사진들을 확인할 수 있는 페이지입니다."
			/>
			<div className="photos-page" style={{ padding: "24px" }}>
				<h1 className="admin-title">
					{category === "all"
						? "All Photos"
						: category[0].toUpperCase() + category.slice(1)}
				</h1>
				<PhotoList photos={photos} />
			</div>
		</>
	);
};

export default PhotoListPage;
