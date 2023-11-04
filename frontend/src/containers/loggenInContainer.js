import SideBar from '../component/sidebar';
import '../Routes/Home.css';
import { Icon } from '@iconify/react';
import songContext from '../context/songContext';
import {useState } from 'react';

function LoggedInContainer({children}){
    
    const [isPaused,setIsPaused] = useState(true)
    const togglePlayPause = () => {
        if (isPaused) {
            setIsPaused(false);
        } else {
            setIsPaused(true);
        }
    };

    return <div className='container'>
        <div className='main'>
            <SideBar SEARCH_BUTTON = "Nclicked" HOME_BUTTON = "clicked" PLAYLISTS_BUTTON = "Nclicked"/>
            {children}
        </div>
    <div className='down'>
        <div className='left'>
            <img src='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg' alt= "m" className='image'/>
                <div className='x'>
                    <div className= 'curtains' >curtains</div>
                    <div className='name'> name</div>
                </div>
            </div>
            <div className='center'>
                <div className='icon'>
                    <Icon icon="solar:skip-previous-linear" color="white" className='icons' />
                    <Icon icon= {isPaused
                                        ? "solar:play-circle-bold"
                                        : "solar:play-circle-bold"
                                } color="white" style = {{fontSize: 40}} className='icons' onClick={togglePlayPause} />
                    <Icon icon="solar:skip-next-linear" color="white" style= {{fontSize: 23}} className='icons'/>
                    
                </div>
                <div className='progressBar'>

                </div>
            </div>

            <div className='right'>
                <progress value={0.1}></progress>
            </div>
        </div>
    </div>
}

export default LoggedInContainer;