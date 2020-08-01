import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import HomeScreen from "./HomeScreen";
import ScannerScreen from "./ScannerScreen";
import DeliveredScreen from "./DeliveredScreen";

export type MainStackNavigatorParamList = {
  Home: undefined;
  Scanner: undefined;
  Deliver: undefined;
};

const Stack = createStackNavigator<MainStackNavigatorParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="Deliver" component={DeliveredScreen} />
    </Stack.Navigator>
  );
}
