import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};
export default RootNavigator;
