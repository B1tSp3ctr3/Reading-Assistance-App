import { Event, useTrackPlayerEvents } from "react-native-track-player";

const events = [
    Event.PlaybackState,
    Event.PlayerError,
    Event.PlaybackActiveTrackChanged,
];

export const useLogTrackPlayerState = () => {
    useTrackPlayerEvents(events, async (event) => {
        if (event.type === Event.PlaybackError) {
            console.warn("An error occured: ", event);
        }
        if (event.type === Event.PlayerState) {
            console.log("Playback State: ", event.state);
        }
        if (event.type === Event.PlaybackActiveTrackChanged) {
            console.log("Track changed: ", event.index);
        }
    });
};
