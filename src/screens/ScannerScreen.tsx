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
import { FlatList } from "react-native-gesture-handler";
import Colors from "../constraints/Colors";

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
          }}
        >
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

        {scanData && scanData.length > 0 && scanned && (
          <View
            style={{
              flex: 1,
            }}
          >
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
                    }}
                  >
                    <Text>Total count {scanCount}</Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: Colors.white,
                      marginBottom: 5,
                      borderBottomWidth: 0.5,
                      borderBottomColor: Colors.lightGray,
                    }}
                  >
                    <Text>{item}</Text>
                  </View>
                )}
              />
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Deliver");
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
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
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
                style={{
                  backgroundColor: "gray",
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                  }}
                >
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
