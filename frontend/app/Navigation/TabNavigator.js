import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";

import colors from "../config/colors";
import Favourites from "../screens/Favourites";
import NewDoc from "../screens/NewDoc";
import Home from "../screens/Home";
import { defaultHeaderOptions } from "../config/navigationStyles";
import NewDocButton from "./NewDocButton";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    // <View>
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.neutral,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
        },
        headerTitleAlign: "left",
        tabBarStyle: {
          position: "absolute",
          paddingTop: 8,
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        headerSearchBarOptions: {
          textColor: "#000000",
          placeholder: "Search",
        },
        tabBarBackground: () => (
          <BlurView intensity={90} tint="dark" style={styles.blurView} />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={NewDoc}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <View style={styles.centerButtonContainer}>
              <NewDocButton onPress={() => navigation.navigate("Upload")} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          ...defaultHeaderOptions,
          headerTitle: "Favourites",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    // </View>
  );
};
const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  centerButtonContainer: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    zIndex: 1,
  },
});
export default TabNavigator;
