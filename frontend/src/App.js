import SignUp from './Routes/signup';
import Login from './Routes/login';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Search from './Routes/search.js'
import Playlist from './Routes/Playlist';
import Home from './Routes/Home';
import PlaylistView from './Routes/PlaylistView.js';
import songContext from './context/songContext.js';
import { useState } from 'react';
import logo from "./component/logo.png"


function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [cookie] = useCookies(["token"]);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [songDetails,setSongDetails] = useState([{name : "name", thumbnail : logo,artist : "artist"}]);
  const [currentIndex,setCurrentIndex] = useState(0)
  const [song,setSong] = useState(null)

  return (
    <BrowserRouter>
      {cookie.token?(
        <songContext.Provider
                        value={{
                            song,
                            setSong,
                            songDetails,
                            setSongDetails,
                            currentSong,
                            setCurrentSong,
                            currentIndex,
                            setCurrentIndex,
                            soundPlayed,
                            setSoundPlayed,
                            isPaused,
                            setIsPaused,
                        }}
                    >
        <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/playlist' element={<Playlist/>}/>
        <Route path='/playlist/:playlistId' element={<PlaylistView/>}/>
        <Route path='*' element={<Navigate to = "/home" />}/>

        </Routes>
        </songContext.Provider>
      ):(
        <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<Navigate to = "/login" />}/>
        </Routes>
        )
      }
    </BrowserRouter>
  );
}

export default App;
