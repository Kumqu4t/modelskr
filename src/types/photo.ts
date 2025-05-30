export interface Photo {
	_id: string;
	images: {
		url: string;
		public_id: string;
	}[];
	title: string;
	models?: string[]; // Model의 ObjectId 배열
	people?: string[]; // Person의 ObjectId 배열
	category?: "commercial" | "editorial" | "others";
	description?: string;
	tags?: string[];
	createdAt: string;
	updatedAt: string;
}

export type CreatePhotoInput = Omit<Photo, "_id" | "createdAt" | "updatedAt">;
export type UpdatePhotoInput = Partial<CreatePhotoInput> & { _id: string };
