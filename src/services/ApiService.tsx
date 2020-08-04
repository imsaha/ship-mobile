import { HttpService } from "./HttpService";
import { Login, LoginResponse } from "../models/auth.model";
import {
	DashboardResponse,
	PackageInfo,
	PackageDeliveredRequest,
} from "../models/data.model";

export default class ApiService {
	private readonly http: HttpService;
	constructor() {
		this.http = new HttpService();
	}

	public LoginAsync(login: Login) {
		if (login && login.email && login.password) {
			return this.http.postAsync<LoginResponse>("account/login", login);
		} else {
			return Promise.reject("Invalid login attempt.");
		}
	}

	public GetDashboardAsync() {
		return this.http.getAsync<DashboardResponse>("clientportal/dashboard");
	}

	public GetPackageInfoAsync(token: string) {
		return this.http.getAsync<PackageInfo>(`ClientPortal/Packages/${token}`);
	}

	public PostPackageDeliveryAsync(data: PackageDeliveredRequest) {
		return this.http.postAsync<boolean>(`Packages/Delivered`, data);
	}
}
