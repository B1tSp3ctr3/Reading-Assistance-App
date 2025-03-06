import client from "./client";

const textEndpoint = "audios/convert/"; // Endpoint to post text
const speechEndpoint = "audio/audio/"; // Endpoint to get audio

export const tts = (textData) => {
    // Create FormData for the text endpoint
    const data = new FormData();
    data.append("text", textData);
    return client.post(textEndpoint, data);
};
export const getAudio = (fileID) => {
    // Get the audio file using the fileId
    return client.get(`${speechEndpoint}${fileID}`);
};
export default {
    tts,
    getAudio,
};
