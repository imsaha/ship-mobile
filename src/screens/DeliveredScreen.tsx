import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
} from "react-native";
import { MainStackNavigatorParamList } from "./MainStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ScrollView, TextInput, FlatList } from "react-native-gesture-handler";
import PackageItemView from "../components/PackageItemView";
import { PackageDeliveredRequest } from "../models/data.model";
import ApiService from "../services/ApiService";

type DeliveredScreenProps = {
	navigation: StackNavigationProp<MainStackNavigatorParamList, "Deliver">;
	route: RouteProp<MainStackNavigatorParamList, "Deliver">;
};

type DeliveredScreenState = {
	processing: boolean;
	data: PackageDeliveredRequest;
};

export default class DeliveredScreen extends React.Component<
	DeliveredScreenProps,
	DeliveredScreenState
> {
	private readonly api: ApiService;
	constructor(props: DeliveredScreenProps) {
		super(props);

		this.api = new ApiService();

		props.navigation.setOptions({
			headerTransparent: false,
			title: this.props.route.params.failed
				? "Delivery failed"
				: "Delivery success",
		});

		this.state = {
			processing: false,
			data: {
				tokens: this.props.route.params.data.map((m) => m.barcode),
				isSuccess: !this.props.route.params.failed,
				note: "",
			},
		};
	}

	handleNotexText = (evt) => {
		const { data } = this.state;
		data.note = evt.nativeEvent.text;
		this.setState({ data });
	};

	handleDeliverySubmit = async () => {
		this.setState({ processing: true });
		try {
			const response = await this.api.PostPackageDeliveryAsync(this.state.data);
			this.props.navigation.navigate("Home");
		} catch (error) {
			Alert.alert(error?.message ?? "Something went wrong.");
		} finally {
			this.setState({ processing: false });
		}
	};

	render() {
		const { data } = this.state;
		return (
			<View style={{ flex: 1, paddingTop: 5 }}>
				<FlatList
					keyExtractor={(item, index) => `${item.id}_${index}`}
					data={this.props.route.params.data}
					renderItem={({ item }) => <PackageItemView data={item} />}
					ListFooterComponent={() => (
						<View>
							<View
								style={{
									padding: 15,
								}}>
								<Text>
									{data.isSuccess ? "Success delivery" : "Failed delivery"}{" "}
									note:
								</Text>
								<TextInput
									multiline
									style={{
										height: 150,
										justifyContent: "flex-start",
										borderWidth: 0.8,
										borderColor: "gray",
										borderRadius: 4,
										padding: 10,
										paddingVertical: 15,
									}}
									onChange={this.handleNotexText}
								/>
							</View>

							<View
								style={{
									padding: 15,
								}}>
								<TouchableOpacity
									disabled={this.state.processing}
									activeOpacity={0.8}
									style={{
										marginHorizontal: 15,
										paddingVertical: 15,
										alignItems: "center",
										backgroundColor: this.state.processing
											? "gray"
											: data.isSuccess
											? "green"
											: "red",
										borderRadius: 4,
										marginTop: 20,
										flexDirection: "row",
										justifyContent: "center",
									}}
									onPress={this.handleDeliverySubmit}>
									{this.state.processing && (
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
										Delivery {data.isSuccess ? "confirmed" : "failed"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				/>
			</View>
		);
	}
}
