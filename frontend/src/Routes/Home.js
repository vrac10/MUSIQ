import SideBar from '../component/sidebar';
import './Home.css';
import { Icon } from '@iconify/react';

function Home(){
    return <div className='container'>
        <div className='main'>
            <SideBar SEARCH_BUTTON = "Nclicked" HOME_BUTTON = "clicked" PLAYLISTS_BUTTON = "Nclicked"/>
          
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
                <div>
                <Icon icon="solar:skip-previous-linear" color="white" className='icons' />
                <Icon icon="solar:pause-circle-bold" color="white" className='icons1'/>
                <Icon icon="solar:skip-next-linear" color="white" className='icons'/>
                </div>
            </div>

            <div className='right'>
                hello
            </div>
        </div>
    </div>
}

export default Home;