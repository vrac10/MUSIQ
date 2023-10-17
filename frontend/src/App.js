import SignUp from './signup';
import Login from './login';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

function App() {
  const [cookie,setCookie] = useCookies(["token"]);


  return (
    <BrowserRouter>
      {cookie.token?(
        <Routes>
        <Route path='/home' element={<div>Hello</div>}/>
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
