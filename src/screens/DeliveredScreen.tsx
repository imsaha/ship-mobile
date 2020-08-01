import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { MainStackNavigatorParamList } from "./MainStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type DeliveredScreenProps = {
  navigation: StackNavigationProp<MainStackNavigatorParamList, "Deliver">;
  route: RouteProp<MainStackNavigatorParamList, "Deliver">;
};

type DeliveredScreenState = {};

export default class DeliveredScreen extends React.Component<
  DeliveredScreenProps,
  DeliveredScreenState
> {
  constructor(props: DeliveredScreenProps) {
    super(props);

    props.navigation.setOptions({
      headerTransparent: false,
      title: "xfsfsfsf",
    });
  }

  render() {
    return (
      <View>
        <Text>DeliveredScreen</Text>
        {/* <Sign /> */}
      </View>
    );
  }
}
