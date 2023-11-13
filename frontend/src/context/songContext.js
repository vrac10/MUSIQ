import {createContext} from "react";

const songContext = createContext({
    song: null,
    setSong: (songs) => {},
    songDetails: null,
    setSongDetails: (songDetails) => {},
    currentSong: null,
    currentIndex : null,
    setCurrentIndex: (currentIndex) => {},
    setCurrentSong: (currentSong) => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: null,
    setIsPaused: () => {},
});

export default songContext;