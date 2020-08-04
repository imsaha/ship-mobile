import React, { Component } from "react";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_BASE } from "../constraints/AppConstraint";
import AsyncStorage from "@react-native-community/async-storage";

export class HttpService {
	axiosClient: AxiosInstance;

	constructor() {
		this.axiosClient = axios.create({
			baseURL: API_BASE,
			timeout: 10000,
			headers: {
				"X-D-Client": "mob",
				"Cache-control": "no-cache",
				Expires: "0",
				Pragma: "no-cache",
			},
		});

		this.axiosClient.interceptors.request.use((config) => {
			// TODO: replace the hardcoded 'en' to user's choice of language
			const url = config.url?.replace("{lang}", "en") ?? "";

			config.headers = {
				...config.headers,
				"Content-Type": "application/json",
			};
			config.url = url;
			return config;
		});

		AsyncStorage.getItem("token").then((token) => {
			this.axiosClient.interceptors.request.use((config) => {
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${token}`,
				};
				return config;
			});
		});
	}

	public async getAsync<T>(url: string) {
		try {
			const response = await this.axiosClient.get<T>(url);

			if (response.status !== 200) {
				throw {
					status: response.status,
					statusText: response.statusText,
				};
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public async postAsync<T>(url: string, data?: any) {
		try {
			const response = await this.axiosClient.post<T>(url, data);
			if (response.status !== 200) {
				throw {
					status: response.status,
					statusText: response.statusText,
				};
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public async deleteAsync<T>(url: string) {
		try {
			const response = await this.axiosClient.delete<T>(url);

			if (response.status !== 200) {
				throw {
					status: response.status,
					statusText: response.statusText,
				};
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

export interface IResult<T> {
	message?: string;
	data: T;
}
