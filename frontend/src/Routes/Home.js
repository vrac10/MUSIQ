import './Home.css';
import SongCard from "../component/SongCard";
import LoggedInContainer from '../containers/loggenInContainer';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { makeFrontPageRequest } from '../utils/serverHelper';
import { useNavigate } from 'react-router-dom';


function Home(){

    const [cookie,setCookie,removeCookie] = useCookies(['token'])
    const [cover, setCover] = useState([{name : "hi", thumbnail : "ji"}]);
    const greeting = new Date().getHours();
    var g = "GOOD ";
    if(greeting > 12 && greeting < 17){
        g += "AFTERNOON"
    }
    else if(greeting > 17 || greeting < 6) {
        g += "EVENING"
    }
    else if(greeting > 6 ){
        g += "MORNING"
    }


    const navigate = useNavigate();

    // Assuming you are triggering the navigation inside a function or event handler
    const navigateToPlaylist = (item, arrayProp, thumbnailProp,nameProp) => {
      navigate(`/album/${item._id}`, { state: { arrayProp: arrayProp , thumbnailProp : thumbnailProp, nameProp : nameProp } });
    };

    useEffect(() => {
        const getplaylists = async () => {
            const response = await makeFrontPageRequest();
    
            if(response && !response.err){
                setCover(response);
            }
            else{
                console.log(response.err);
            }
        }

        getplaylists();
    },[])
    

    

    const logoutfuc = () => {
        removeCookie('token',{path : '/', domain : 'localhost'});
        alert('You have been logged out');
    }

    return (
        <LoggedInContainer home = "clicked" search = "Nclicked" playlists = "Nclicked">
        <div className="RightOfHome">
            <div className='gn'>
                <div className='greeting'>
                    <b>{g}</b>
                </div>
                <div className='userName' onClick={logoutfuc}>
                    LogOut
                </div>
            </div>
            <div className='ArtistSpecific'>
                Top Songs :
                <div className='Artist-Playlists'>
                        {cover.map((item,index) =>(
                            <SongCard
                                key={index}
                                name={item.name}
                                imgSC={item.thumbnail}
                                onClick={()=> {
                                    navigateToPlaylist(item._id, item.tracks, item.thumbnail, item.name)
                                }}
                            />
                        ))}
                </div>
            </div>
        </div>
        </LoggedInContainer>
    )
}

export default Home;