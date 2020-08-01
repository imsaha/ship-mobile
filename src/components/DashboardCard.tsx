import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Colors from "../constraints/Colors";

type DashboardCardProps = {
  height: number;
  width: number;
  title?: string;
  value?: number;
  onCLick?: (type: string) => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<TextStyle>;
};

const DashboardCard = (props: DashboardCardProps) => {
  return (
    <View
      style={[
        styles.box,
        {
          height: props.height,
          width: props.width,
        },
        props.style,
      ]}
    >
      <Text style={[styles.title, props.contentStyle]}>{props.title}</Text>
      <Text style={[styles.value, props.contentStyle]}>{props.value}</Text>
    </View>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  box: {
    // backgroundColor: Colors.totalDelivery,
    marginVertical: 10,
    padding: 10,
    // margin: 3,
    borderRadius: 4,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
  },
  value: {
    fontSize: 26,
  },
});
