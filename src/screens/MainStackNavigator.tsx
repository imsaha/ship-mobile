import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import HomeScreen from "./HomeScreen";
import ScannerScreen from "./ScannerScreen";

export type MainStackNavigatorParamList = {
  Home: undefined;
  Scanner: undefined;
};

const Stack = createStackNavigator<MainStackNavigatorParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
    </Stack.Navigator>
  );
}
