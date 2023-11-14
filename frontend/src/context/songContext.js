import {createContext} from "react";

const songContext = createContext({
    song: null,
    setSong: (songs) => {},
    currentPlaylist: null,
    setCurrentPlaylist: (currentPlaylist) => {},
    songDetails: null,
    setSongDetails: (songDetails) => {},
    currentSong: null,
    currentIndex : null,
    setCurrentIndex: (currentIndex) => {},
    setCurrentSong: (currentSong) => {},
    isPaused: null,
    setIsPaused: () => {},
});

export default songContext;