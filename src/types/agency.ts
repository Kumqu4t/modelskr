export interface Agency {
	_id: string;
	name: string;
	description: string;
	logo: {
		url: string;
		public_id: string;
	};
	homepage: string;
	createdAt: string;
	updatedAt: string;
}

export type CreateAgencyInput = Omit<Agency, "_id" | "createdAt" | "updatedAt">;
export type UpdateModelInput = Partial<CreateAgencyInput> & { _id: string };
