import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import HomeScreen from "./HomeScreen";
import ScannerScreen from "./ScannerScreen";
import DeliveredScreen from "./DeliveredScreen";
import LoginScreen from "./LoginScreen";
import { PackageInfo } from "../models/data.model";

export type MainStackNavigatorParamList = {
	Login: undefined;
	Home: undefined;
	Scanner: {
		onBack: () => void;
	};
	Deliver: {
		failed: boolean;
		data: PackageInfo[];
	};
};

const Stack = createStackNavigator<MainStackNavigatorParamList>();

export default function MainStackNavigator({
	initialRouteName,
}: {
	initialRouteName: "Login" | "Home";
}) {
	return (
		<Stack.Navigator initialRouteName={initialRouteName ?? "Login"}>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Scanner" component={ScannerScreen} />
			<Stack.Screen name="Deliver" component={DeliveredScreen} />
		</Stack.Navigator>
	);
}
