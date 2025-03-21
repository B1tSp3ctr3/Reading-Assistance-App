import TrackPlayer from "react-native-track-player";

export default async function() {
    // Handle background events. For example:
    TrackPlayer.addEventListener("remote-play", () => {
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener("remote-pause", () => {
        TrackPlayer.pause();
    });
    // Add more event listeners as needed...
}
