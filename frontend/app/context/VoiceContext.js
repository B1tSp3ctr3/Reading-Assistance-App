import { createContext } from "react";

const VoiceContext = createContext({
    isListening: false,
    setIsListening: () => { },
});

export default VoiceContext;
