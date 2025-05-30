export interface Agency {
	_id?: string;
	name: string;
	description: string;
	logo: {
		url: string;
		public_id: string;
	};
	homepage: string;
	createdAt?: string;
	updatedAt?: string;
}
