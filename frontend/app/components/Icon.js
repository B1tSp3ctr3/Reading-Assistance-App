import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../config/colors";
function Icon({
  name,
  size = 40,
  backgroundColor = "white",
  iconColor = colors.secondary,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome5 name={name} color={iconColor} size={size * 0.6} />
    </View>
  );
}
export default Icon;
