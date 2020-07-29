import React, { Component } from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./screens/MainStackNavigator";

export default class ShipApp extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    );
  }
}
