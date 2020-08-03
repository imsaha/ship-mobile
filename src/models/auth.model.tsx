export type Login = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: string;
	expiry: Date;
	name: string;
};
