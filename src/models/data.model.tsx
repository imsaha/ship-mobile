import { PackageType } from "./enums";

export type DashboardResponse = {
	success: number;
	failed: number;
	waiting: number;
};

export type PackageInfo = {
	id: number;
	delivered?: any;
	note?: any;
	associateId?: any;
	associateName?: any;
	barcode: string;
	weightInKg: number;
	packageType: PackageType;
	line1: string;
	line2?: any;
	city: string;
	state: string;
	country: string;
	zipCode?: any;
	mobile: string;
	contactName?: string;
};

export type PackageDeliveredRequest = {
	tokens: string[];
	isSuccess: boolean;
	note: string;
};
