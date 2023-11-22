import './Login.css'
import TitleBar from '../component/titlebar.js'
import {makeUnauthenticatedPostRequest} from '../utils/serverHelper.js';
import { useState } from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [cookie, setCookie] = useCookies(["token"]);

    const navigate = useNavigate();

    const LoginBut= async () => {
        
        const data = {username,password};

        const response = await makeUnauthenticatedPostRequest("auth/login", data);

        if(response && !response.err){
            const token = response.token;
            const date = new Date();

            date.setDate(date.getDate() + 30);

            setCookie("token",token,{path :"/", expires: date});
            alert("Logged In");
            navigate('/home');
        }
        else{
            alert("Couldn't login");
        }

    }


    return (<div className='main1'>   
    <TitleBar/> 
    <div id="input-containers">
        <h1>LOGIN</h1>
        <input type="text" id="Email" placeholder="Username"
        className="wide-input input-field" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        <br/>
        <input type="password" id="Password"  placeholder="Password"
        className="wide-input input-field" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <button id="bti" onClick={(e) => {
            e.preventDefault();
            LoginBut();
        }}>Login</button>
        <p id="sgp" onClick={() => {
            navigate('/signup')
        }}>Sign Up?</p>
    </div>  
</div>);
}

export default Login;