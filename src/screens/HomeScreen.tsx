import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackNavigatorParamList } from "./MainStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

type HomeScreenProps = {
  navigation: StackNavigationProp<MainStackNavigatorParamList, "Home">;
};

type HomeScreenState = {
  isReady: boolean;
};

export default class HomeScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    try {
      this.props.navigation.setOptions({
        title: "Hello, Siraj",
        headerRight: ({ tintColor }) => (
          <TouchableOpacity
            onPress={this.openScanner}
            style={{
              padding: 10,
            }}
          >
            <Ionicons name="md-qr-scanner" size={24} />
          </TouchableOpacity>
        ),
      });

      this.props.navigation.addListener("focus", (e) => {
        this.setState({ isReady: false }, () => {
          this.updateDashboardData();
        });
      });
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({
        isReady: true,
      });
    }
  }

  openScanner = () => {
    this.props.navigation.navigate("Scanner");
  };

  updateDashboardData = () => {
    try {
      const { isReady } = this.state;
      if (!isReady) {
        // TODO: Fetch data from API
        console.log("screen's updating...");
      }
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({ isReady: true });
    }
  };

  render() {
    const { isReady } = this.state;

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
        }}
      >
        <View
          style={{
            height: 100,
            width: null,
            backgroundColor: "blue",
            marginTop: 10,
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 19,
              fontWeight: "700",
            }}
          >
            Total scan
          </Text>
          <Text
            style={{
              fontSize: 26,
            }}
          >
            10
          </Text>
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
          }}
        >
          <Ionicons name="md-qr-scanner" size={26} />
          <Text
            style={{
              paddingHorizontal: 10,
            }}
          >
            New Scan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
