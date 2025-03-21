import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FloatingPlayer } from "../components/FloatingPlayer";
import colors from "../config/colors";
import { defaultHeaderOptions } from "../config/navigationStyles";
import Favourites from "../screens/Favourites";
import Home from "../screens/Home";
import NewDoc from "../screens/NewDoc";
import NewDocButton from "./NewDocButton";

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
                            <MaterialCommunityIcons
                                name="star-outline"
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
    centerButtonContainer: {
        position: "absolute",
        top: -22,
        alignSelf: "center",
        zIndex: 999,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
});

export default TabNavigator;
