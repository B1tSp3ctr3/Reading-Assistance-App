import React from "react";
import Constants from "expo-constants";
import {StyleSheet } from "react-native";
import colors from "../config/colors";
import { SafeAreaView} from "react-native-safe-area-context";
function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]} edges={['top'   ]}>
      {children}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
      paddingBottom:20,
    flex: 1,
    backgroundColor: colors.secondary,
  },
});
export default Screen;
