import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import playbackService from "./service";
import App from "./App";
import TrackPlayer from "react-native-track-player";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
TrackPlayer.registerPlaybackService(() => playbackService);
registerRootComponent(App);
AppRegistry.registerComponent("MyApp", () => App);
