import React, { Component } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Alert,
} from "react-native";
import { MainStackNavigatorParamList } from "./MainStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../constraints/Colors";
import ApiService from "../services/ApiService";
import { PackageInfo } from "../models/data.model";
import { PackageType, enumToArray } from "../models/enums";
import PackageItemView from "../components/PackageItemView";

type ScannerScreenProps = {
	navigation: StackNavigationProp<MainStackNavigatorParamList, "Scanner">;
	route: RouteProp<MainStackNavigatorParamList, "Scanner">;
};

type ScannerScreenState = {
	hasPermission: boolean;
	scanned: boolean;
	scanData: PackageInfo[];
};

export default class ScannerScreen extends React.Component<
	ScannerScreenProps,
	ScannerScreenState
> {
	private readonly api: ApiService;
	constructor(props: ScannerScreenProps) {
		super(props);

		this.api = new ApiService();

		this.state = {
			hasPermission: null,
			scanned: false,
			scanData: [
				// {
				// 	id: 1,
				// 	contactName: "Test name",
				// 	barcode: "1324356778",
				// 	packageType: PackageType.Document,
				// 	weightInKg: 5,
				// 	line1: "Dubai",
				// 	city: "Dubai",
				// 	country: "UAE",
				// 	state: "Dubai",
				// 	mobile: "234567",
				// },
			],
		};

		props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{
						backgroundColor: "white",
						paddingHorizontal: 13,
						flexDirection: "row",
						alignItems: "center",
						position: "relative",
					}}
					onPress={() => {
						this.setState({ scanned: false });
					}}>
					<Ionicons name="md-qr-scanner" size={26} />
					<Ionicons
						name="ios-add"
						size={20}
						style={{
							position: "absolute",
							left: 19,
						}}
					/>
				</TouchableOpacity>
			),
		});
	}

	async componentDidMount() {
		try {
			const { granted } = await BarCodeScanner.requestPermissionsAsync();
			this.setState({
				hasPermission: granted,
			});
		} catch (error) {
			console.warn(error);
		}
	}

	componentWillUnmount() {
		const onBack = this.props.route.params.onBack;
		if (onBack) {
			onBack();
		}
	}

	handleBarcodeScan = async ({ type, data }) => {
		const { scanData } = this.state;
		try {
			const existIndex = scanData.findIndex(
				(x) => x.barcode === `${data}`.toLowerCase()
			);
			if (existIndex > -1) {
				scanData.splice(existIndex, 1);
			}
			const response = await this.api.GetPackageInfoAsync(data);
			if (response) {
				this.setState({ scanData: scanData.concat([response]) });
			}
		} catch (error) {
			console.warn(error);
		} finally {
			this.setState({
				scanned: true,
			});
		}
	};

	render() {
		const { hasPermission, scanned, scanData } = this.state;
		const packageTypes = enumToArray(PackageType);

		if (hasPermission === null) {
			return (
				<ActivityIndicator
					animating={true}
					size={30}
					style={{ marginTop: 30 }}
				/>
			);
		}
		if (hasPermission === false) {
			return <Text>No access to camera</Text>;
		}

		return (
			<View
				style={{
					flex: 1,
					flexDirection: "column",
					justifyContent: "flex-start",
				}}>
				{!scanned && (
					<View
						style={{
							flex: 1,
							position: "relative",
						}}>
						<BarCodeScanner
							onBarCodeScanned={this.handleBarcodeScan}
							style={StyleSheet.absoluteFillObject}
						/>

						{scanData && scanData.length > 0 && (
							<TouchableOpacity
								onPress={() => {
									this.setState({ scanned: true });
								}}
								activeOpacity={0.8}
								style={{
									position: "absolute",
									bottom: 10,
									left: 10,
									right: 10,
									height: 50,
									backgroundColor: "#eee",
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Text
									style={{
										fontSize: 16,
									}}>
									Cancel
								</Text>
							</TouchableOpacity>
						)}
					</View>
				)}

				{scanData && scanData.length > 0 && scanned && (
					<View
						style={{
							flex: 1,
						}}>
						<View style={{ flex: 1 }}>
							<FlatList
								data={scanData}
								keyExtractor={(item, index) => `${item}_${index}`}
								ListHeaderComponent={() => (
									<View
										style={{
											padding: 10,
											marginBottom: 5,
											// backgroundColor: Colors.white,
										}}>
										<Text>Total count {scanData?.length ?? 0}</Text>
									</View>
								)}
								renderItem={({ item, index }) => (
									<PackageItemView
										data={item}
										onDelete={() => {
											Alert.alert(
												"Confirm",
												"Are you sure, you want to remove?",
												[
													{ text: "No" },
													{
														text: "I'm Sure",
														style: "destructive",
														onPress: (value) => {
															const existIndex = scanData.findIndex(
																(x) => x.id === item.id
															);
															if (existIndex > -1) {
																const newScannedData = scanData.splice(
																	existIndex,
																	1
																);
																this.setState({ scanData: newScannedData });
															}
														},
													},
												]
											);
										}}
									/>
								)}
							/>
						</View>
						<View style={{}}>
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate("Deliver", {
										data: this.state.scanData,
										failed: false,
									});
								}}
								activeOpacity={0.8}
								style={{
									backgroundColor: "green",
									paddingHorizontal: 10,
									paddingVertical: 20,
									marginBottom: 10,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}>
								<Text
									style={{
										fontWeight: "700",
										color: "#fff",
									}}>
									Package delivered
								</Text>

								<Ionicons
									name="md-done-all"
									size={24}
									style={{
										color: "white",
									}}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									this.props.navigation.navigate("Deliver", {
										data: this.state.scanData,
										failed: true,
									});
								}}
								style={{
									backgroundColor: "gray",
									paddingHorizontal: 10,
									paddingVertical: 20,
									marginBottom: 10,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}>
								<Text
									style={{
										fontWeight: "700",
									}}>
									Uncessfull delivery
								</Text>
								<Ionicons name="md-close" size={24} />
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		);
	}
}
