import { Agency } from "./agency";

export interface Person {
	_id?: string;
	name: string;
	aliases?: string[];
	gender?: "male" | "female";
	role: "photographer" | "hair" | "makeup";
	birthDate?: number;
	nationality?: string;
	agency?: string | Agency;
	tags?: string[];
	recentWork?: {
		title?: string;
		type?: string;
		link?: string;
	}[];
	contact?: string;
	image?: {
		url: string;
		public_id: string;
	};
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}
