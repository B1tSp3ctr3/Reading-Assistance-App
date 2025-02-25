import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";
function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && <FontAwesome5 name={icon} size={25} color={colors.primary} />}
      <TextInput
        style={styles.textInput}
        {...otherProps}
        placeholderTextColor={"#A8A8A8"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgrey,
    borderRadius: 1000,
    marginVertical: 10,
    padding: 15,
    width: "100%",
    flexDirection: "row",
  },
  textInput: {
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    marginLeft: 10,
    color: colors.darkgrey,
  },
});
export default AppTextInput;
