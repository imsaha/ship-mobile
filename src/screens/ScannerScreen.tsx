import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MainStackNavigatorParamList } from "./MainStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";

type ScannerScreenProps = {
  navigation: StackNavigationProp<MainStackNavigatorParamList, "Scanner">;
  route: RouteProp<MainStackNavigatorParamList, "Scanner">;
};

type ScannerScreenState = {
  hasPermission: boolean;
  scanned: boolean;
  scanCount: number;
  scanData: string[];
};

export default class ScannerScreen extends React.Component<
  ScannerScreenProps,
  ScannerScreenState
> {
  constructor(props: ScannerScreenProps) {
    super(props);

    this.state = {
      hasPermission: null,
      scanned: false,
      scanCount: 0,
      scanData: [],
    };
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

  handleBarcodeScan = ({ type, data }) => {
    try {
      console.log(data);

      this.setState({
        ...this.state,
        scanned: true,
        scanCount: this.state.scanCount + 1,
        scanData: this.state.scanData.concat([data]),
      });
      console.log(this.state.scanCount);
    } catch (error) {
      console.warn(error);
    }
  };

  render() {
    const { hasPermission, scanned, scanCount, scanData } = this.state;
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
        }}
      >
        {!scanned && (
          <BarCodeScanner
            onBarCodeScanned={this.handleBarcodeScan}
            style={StyleSheet.absoluteFillObject}
          />
        )}

        {scanData &&
          scanData.length > 0 &&
          scanData.map((data) => (
            <View>
              <Text>{data}</Text>
            </View>
          ))}

        {scanned && (
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              this.setState({ scanned: false });
            }}
          >
            <Text>{scanCount}</Text>
            <Text>Scan again</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
