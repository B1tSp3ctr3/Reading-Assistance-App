import client from "./client";

const textEndpoint = "tts2/speak"; // Endpoint to post text

export const tts = (textData) => {
    // Create FormData for the text endpoint
    const data = new FormData();
    data.append("text", textData);
    return client.post(textEndpoint, data);
};
export default {
    tts,
};
