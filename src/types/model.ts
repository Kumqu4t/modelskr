import { Agency } from "./agency";

export interface Model {
	_id: string;
	name: string;
	aliases?: string[];
	gender?: "male" | "female";
	birthYear?: number;
	nationality?: string;
	height?: number;
	measurements?: {
		chest?: number;
		waist?: number;
		hips?: number;
	};
	shoeSize?: number;
	agency?: string | Agency; // Agency id | Agency object
	tags?: string[];
	recentWork?: {
		title?: string;
		type?: string;
		link?: string;
	}[];
	contact?: string;
	image: {
		url: string;
		public_id: string;
	};
	description?: string;
	createdAt: string;
	updatedAt: string;
}

export type CreateModelInput = Omit<Model, "_id" | "createdAt" | "updatedAt">;
export type UpdateModelInput = Partial<CreateModelInput> & { _id: string };
