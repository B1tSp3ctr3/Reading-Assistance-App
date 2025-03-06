import React from "react";
import { View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import Text from "../components/Text";
function Favourites(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text>Favourites</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Favourites;
