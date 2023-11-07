import SignUp from './Routes/signup';
import Login from './Routes/login';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Search from './Routes/search.js'
import Playlist from './Routes/Playlist';
import Home from './Routes/Home';
import PlaylistView from './Routes/PlaylistView.js';

function App() {
  const [cookie,setCookie] = useCookies(["token"]);


  return (
    <BrowserRouter>
      {cookie.token?(
        <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/playlist' element={<Playlist/>}/>
        <Route path='/playlist/:playlistId' element={<PlaylistView/>}/>
        <Route path='*' element={<Navigate to = "/home" />}/>

        </Routes>
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
