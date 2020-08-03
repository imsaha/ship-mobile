import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./screens/MainStackNavigator";
import AsyncStorage from "@react-native-community/async-storage";

type ShipAppState = {
	hasValidToken: boolean;
	isReady: boolean;
};

export default class ShipApp extends React.Component<any, ShipAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			hasValidToken: false,
			isReady: false,
		};
	}

	async componentDidMount() {
		try {
			const token = await AsyncStorage.getItem("token");
			const expiry = new Date(await AsyncStorage.getItem("expiry"));
			this.setState({ hasValidToken: token != null && expiry > new Date() });
		} catch (error) {
			console.warn(error);
		} finally {
			this.setState({ isReady: true });
		}
	}

	render() {
		if (!this.state.isReady) {
			return (
				<View style={{ paddingTop: 50 }}>
					<ActivityIndicator animating size={30} />
				</View>
			);
		}

		return (
			<NavigationContainer>
				<MainStackNavigator
					initialRouteName={this.state.hasValidToken ? "Home" : "Login"}
				/>
			</NavigationContainer>
		);
	}
}
