import React, { Component } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	KeyboardAvoidingView,
	Alert,
	ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackNavigatorParamList } from "./MainStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { Login } from "../models/auth.model";
import { emitNotification } from "expo/build/Notifications/Notifications";
import ApiService from "../services/ApiService";

type LoginScreenProps = {
	navigation: StackNavigationProp<MainStackNavigatorParamList, "Login">;
};

type LoginScreenState = {
	login: Login;
	canLogin: boolean;
	logingIn: boolean;
};

export default class LoginScreen extends React.Component<
	LoginScreenProps,
	LoginScreenState
> {
	private readonly api: ApiService;
	constructor(props: any) {
		super(props);

		this.api = new ApiService();

		this.props.navigation.setOptions({
			headerTransparent: true,
			title: "",
		});

		this.state = {
			login: {
				email: "",
				password: "",
			},
			canLogin: false,
			logingIn: false,
		};
	}

	handleEmailText = (evt) => {
		const { login } = this.state;
		login.email = evt.nativeEvent.text;
		this.setState({ login, canLogin: this.canLogin() });
	};

	handlePasswordText = (evt) => {
		const { login } = this.state;
		login.password = evt.nativeEvent.text;
		this.setState({ login, canLogin: this.canLogin() });
	};

	canLogin() {
		const { email, password } = this.state.login;
		return email && email.length > 5 && password && password.length > 5;
	}

	loginAsync = async () => {
		this.setState({ logingIn: true });
		try {
			const response = await this.api.LoginAsync(this.state.login);
			if (response) {
				console.log(response);
				await AsyncStorage.setItem("token", response.token);
				await AsyncStorage.setItem("expiry", response.expiry?.toString());
				await AsyncStorage.setItem("name", response.name);
				this.props.navigation.replace("Home");
			}
		} catch (error) {
			Alert.alert(error?.message ?? "Something went wrong.");
		} finally {
			this.setState({ logingIn: false });
		}
	};

	render() {
		return (
			<SafeAreaView
				style={{
					flex: 1,
				}}>
				<ScrollView>
					<KeyboardAvoidingView keyboardVerticalOffset={30} behavior="position">
						<View
							style={{
								alignItems: "center",
								marginBottom: 30,
								paddingTop: 100,
							}}>
							<Text
								style={{
									fontSize: 26,
									fontWeight: "700",
									marginBottom: 10,
								}}>
								Ship Mobile
							</Text>
							<Text>Login to your account</Text>
						</View>

						<View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
							<Text style={{ fontSize: 16, paddingBottom: 5 }}>
								Email address:
							</Text>
							<TextInput
								style={{
									fontSize: 16,
									borderWidth: 0.6,
									padding: 13,
									borderRadius: 4,
								}}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="you@email.com"
								value={this.state.login.email}
								onChange={this.handleEmailText}
							/>
						</View>

						<View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
							<Text style={{ fontSize: 16, paddingBottom: 5 }}>Password:</Text>
							<TextInput
								secureTextEntry
								style={{
									fontSize: 16,
									borderWidth: 0.6,
									padding: 13,
									borderRadius: 4,
								}}
								value={this.state.login.password}
								placeholder="password"
								onChange={this.handlePasswordText}
							/>
						</View>

						<TouchableOpacity
							disabled={!this.state.canLogin && !this.state.logingIn}
							activeOpacity={0.8}
							style={{
								marginHorizontal: 15,
								paddingVertical: 15,
								alignItems: "center",
								backgroundColor: !this.state.canLogin ? "gray" : "green",
								borderRadius: 4,
								marginTop: 20,
								flexDirection: "row",
								justifyContent: "center",
							}}
							onPress={this.loginAsync}>
							{this.state.logingIn && (
								<ActivityIndicator
									animating={true}
									style={{
										marginRight: 7,
									}}
								/>
							)}
							<Text
								style={{
									fontSize: 15,
								}}>
								Login
							</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
