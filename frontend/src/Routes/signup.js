import './signup.css'
import Titlebar from '../component/titlebar';
import { useState } from 'react';
import {useCookies} from 'react-cookie';
import {makeUnauthenticatedPostRequest} from '../utils/serverHelper.js';
import {useNavigate} from 'react-router-dom';

function SignUp(){

    const [email, setemail] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signUpFunction = async () =>{
        const data = {email, username, password};
        const respon = await makeUnauthenticatedPostRequest('auth/register', data);
        if(respon && !respon.err){
            const token = respon.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token",token,{path :"/", expires: date});
            alert("Successfully registered");
            navigate('/home');
        }
        else{
            alert("Registration failed");
        }
    }   

    return (<div className='main1'>
        <Titlebar/>
        <div id="bodypage2">
            <div id="SL">
                <h2>Start Listening</h2>
            </div>
            <div id="textinputs">
                <label name="username"></label>
                <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                <br/>
                <input type="text" id="email" placeholder="Email"  value={email} onChange={(e) => {setemail(e.target.value)}}/>
                <br/>
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className = 'signup'>
                <button id="bti" onClick={(e) => {
                    e.preventDefault();
                    signUpFunction();
                }}>Sign up</button>
            </div>
            <br/>
            <p id="login" onClick={() => {
                navigate('/login')
            }} >Login?</p>
        </div>
        </div>);
}

export default SignUp;