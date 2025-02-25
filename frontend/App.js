import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./app/Navigation/RootNavigator";
import Screen from "./app/components/Screen";
export default function App() {
    return (
        <Screen>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </Screen>
    );
}
