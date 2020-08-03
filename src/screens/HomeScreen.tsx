import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackNavigatorParamList } from "./MainStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constraints/Colors";
import DashboardCard from "../components/DashboardCard";
import Layout from "../constraints/Layout";
import AsyncStorage from "@react-native-community/async-storage";
import { DashboardResponse } from "../models/data.model";
import ApiService from "../services/ApiService";

type HomeScreenProps = {
	navigation: StackNavigationProp<MainStackNavigatorParamList, "Home">;
};

type HomeScreenState = {
	isReady: boolean;
	name: string;
	data?: DashboardResponse;
};

export default class HomeScreen extends React.Component<
	HomeScreenProps,
	HomeScreenState
> {
	private readonly api: ApiService;
	constructor(props: HomeScreenProps) {
		super(props);

		this.api = new ApiService();
		this.state = {
			isReady: false,
			name: "",
		};
	}

	async componentDidMount() {
		try {
			const name = await AsyncStorage.getItem("name");
			this.setState({ name });

			this.updateDashboardData();
			this.props.navigation.setOptions({
				title: "Ship-Mobile",
				// headerRight: ({ tintColor }) => (
				//   <TouchableOpacity
				//     onPress={this.openScanner}
				//     style={{
				//       padding: 10,
				//     }}
				//   >
				//     <Ionicons name="md-qr-scanner" size={24} />
				//   </TouchableOpacity>
				// ),
			});

			// this.props.navigation.addListener("focus", (e) => {
			//   this.setState({ isReady: false }, () => {
			//     this.updateDashboardData();
			//   });
			// });
		} catch (error) {
			console.warn(error);
		} finally {
			this.setState({
				isReady: true,
			});
		}
	}

	openScanner = () => {
		this.props.navigation.navigate("Scanner", {
			onBack: this.updateDashboardData,
		});
	};

	updateDashboardData = () => {
		try {
			console.log("back");
			const { isReady } = this.state;
			if (!isReady) {
				this.api
					.GetDashboardAsync()
					.then((response) => {
						this.setState({
							data: response,
						});
					})
					.catch((error) => {
						throw error;
					});
			}
		} catch (error) {
			console.warn(error);
		} finally {
			this.setState({ isReady: true });
		}
	};

	render() {
		const { isReady, data } = this.state;

		if (!isReady) {
			return (
				<ActivityIndicator
					animating={true}
					size={30}
					style={{
						marginTop: 30,
					}}
				/>
			);
		}

		return (
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 10,
				}}>
				<View
					style={{
						paddingVertical: 10,
					}}>
					<Text
						style={{
							fontSize: 20,
							alignSelf: "flex-end",
						}}>
						Hello, {this.state.name}
					</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<DashboardCard
						height={100}
						width={Layout.window.width / 2 - 15}
						title="Total scan"
						value={data?.failed}
						style={{
							backgroundColor: Colors.totalDelivery,
						}}
						contentStyle={{
							color: Colors.white,
						}}
					/>

					<DashboardCard
						height={100}
						width={Layout.window.width / 2 - 15}
						title="Total success"
						value={data?.success}
						style={{
							backgroundColor: Colors.deliverySuccess,
						}}
						contentStyle={{
							color: Colors.white,
						}}
					/>
				</View>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<DashboardCard
						height={100}
						width={Layout.window.width / 2 - 15}
						title="Waiting"
						value={data?.waiting}
						style={{
							backgroundColor: Colors.deliverySuccess,
						}}
						contentStyle={{
							color: Colors.white,
						}}
					/>
				</View>

				<TouchableOpacity
					onPress={this.openScanner}
					activeOpacity={0.9}
					style={{
						flexDirection: "row",
						alignItems: "center",
						padding: 25,
						justifyContent: "center",
						backgroundColor: "gray",
						borderRadius: 4,
						marginTop: 30,
					}}>
					<Ionicons name="md-qr-scanner" size={26} />
					<Text
						style={{
							paddingHorizontal: 10,
						}}>
						Start scanning
					</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}
