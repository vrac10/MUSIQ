import './Home.css';
import { Icon } from '@iconify/react';
import { useContext,useState } from 'react';
import LoggedInContainer from '../containers/loggenInContainer';
import { useCookies } from 'react-cookie';

function Home(){

    const [cookie,setCookie,removeCookie] = useCookies(['token'])
    const greeting = new Date().getHours();
    var g = "GOOD ";
    if(greeting > 12 && greeting < 17){
        g += "AFTERNOON"
    }
    else if(greeting > 17 && greeting < 20) {
        g += "EVENING"
    }
    else if((greeting > 20 || greeting >= 0 )&& greeting < 6){
        g += "NIGHT"
    }
    else if(greeting > 6 ){
        g += "MORNING"
    }

    const logoutfuc = () => {
        removeCookie('token',{path : '/', domain : 'localhost'});
        alert('You have been logged out');
    }

    return (
        <LoggedInContainer home = "clicked" search = "Nclicked" playlists = "Nclicked">
            <div className='gn'>
                <div className='greeting'>
                    <b>{g}</b>
                </div>
                <div className='userName' onClick={logoutfuc}>
                    LogOut
                </div>
            </div>
        </LoggedInContainer>
    )
}

export default Home;