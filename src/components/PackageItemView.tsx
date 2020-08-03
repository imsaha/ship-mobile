import React, { Component } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Alert, Text } from "react-native";
import Colors from "../constraints/Colors";
import { PackageInfo } from "../models/data.model";
import { enumToArray, PackageType } from "../models/enums";

type PackageItemViewProps = {
	data: PackageInfo;
	onDelete?: () => void;
};

export default class PackageItemView extends React.Component<
	PackageItemViewProps,
	any
> {
	render() {
		const packageTypes = enumToArray(PackageType);

		const { data, onDelete } = this.props;
		return (
			<View
				style={{
					padding: 10,
					backgroundColor: Colors.white,
					marginBottom: 5,
					borderBottomWidth: 0.5,
					borderBottomColor: Colors.lightGray,
					flexDirection: "row",
					justifyContent: "space-between",
				}}>
				<View style={{ flexDirection: "row" }}>
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: 15,
						}}>
						<Feather name="package" size={45} color="gray" />
					</View>

					<View>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "#eeeeee",
								borderRadius: 50,
							}}>
							<Text>{packageTypes[data.packageType].name}</Text>
						</View>

						<Text
							style={{
								fontSize: 22,
							}}>
							{data.contactName}
						</Text>
						<Text
							style={{
								fontSize: 16,
							}}>
							{data.mobile}
						</Text>

						<Text
							style={{
								fontSize: 14,
							}}>
							Weight: {data.weightInKg} kg
						</Text>
					</View>
				</View>

				{onDelete && (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<TouchableOpacity
							onPress={onDelete}
							activeOpacity={0.8}
							style={{
								padding: 15,
							}}>
							<Ionicons name="ios-trash" size={26} />
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}
}
