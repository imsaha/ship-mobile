import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ShipApp from "./src/ShipApp";
import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { AppLoading } from "expo";

type AppState = {
  isReady: boolean;
};

type AppProps = {};

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      ...Ionicons.font,
      ...FontAwesome.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return <ShipApp />;
  }
}
