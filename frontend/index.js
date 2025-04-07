import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import playbackService from "./service";
import App from "./App";
import TrackPlayer from "react-native-track-player";
TrackPlayer.registerPlaybackService(() => playbackService);
registerRootComponent(App);
AppRegistry.registerComponent("MyApp", () => App);
