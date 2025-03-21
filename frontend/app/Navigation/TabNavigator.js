import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { FloatingPlayer } from "../components/FloatingPlayer";
import colors from "../config/colors";
import Home from "../screens/Home";
import NewDoc from "../screens/NewDoc";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.mediumgrey,
                    tabBarShowLabel: true,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "500",
                        marginBottom: 4,
                    },
                    headerStyle: {
                        backgroundColor: colors.secondary,
                        elevation: 0, // Android
                        shadowOpacity: 0, // iOS
                    },
                    headerTintColor: colors.neutral,
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 22,
                        letterSpacing: 0.5,
                    },
                    headerTitleAlign: "left",
                    tabBarStyle: {
                        position: "absolute",
                        height: 70,
                        paddingTop: 10,
                        paddingBottom: Platform.OS === "ios" ? 20 : 10,
                        borderTopWidth: 0,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        backgroundColor: "transparent",
                        elevation: 0,
                        zIndex: 2,
                    },
                    headerSearchBarOptions: {
                        textColor: colors.neutral,
                        backgroundColor: colors.underlaysecondary,
                        placeholder: "Search documents...",
                        placeholderTextColor: colors.mediumgrey,
                        tintColor: colors.primary,
                    },
                    tabBarBackground: () => (
                        <BlurView intensity={65} tint="dark" style={styles.blurView} />
                    ),
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="home-variant"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Upload"
                    component={NewDoc}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="plus-circle"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
            <FloatingPlayer style={[styles.floatingPlayer, { zIndex: 1 }]} />
        </>
    );
};

const styles = StyleSheet.create({
    floatingPlayer: {
        position: "absolute",
        left: 8,
        right: 8,
        bottom: 78,
        zIndex: 1,
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
        overflow: "hidden",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "rgba(20, 28, 38, 0.7)", // Using underlaysecondary with opacity
    },
});

export default TabNavigator;
