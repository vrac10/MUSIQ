import { useEffect, useState } from "react";
import "./PlaylistView.css";
import LoggedInContainer from "../containers/loggenInContainer";
import { Icon } from '@iconify/react';
import PlusSign from "../component/plusSign";
import { makeAuthenticatedGetRequest } from "../utils/serverHelper";
import { useParams } from "react-router-dom";



function PlaylistView() {

    const [Play,setIsPlay] = useState(true)
    const [songs,setSongs]= useState([])
    const [playlist,setPlaylist] = useState({})
 
    const {playlistId} = useParams();

    useEffect(() => {
      const fetchPlaylist = async () => {
        try {
          const response = await makeAuthenticatedGetRequest(
            `playlist/get/playlist/${playlistId}`
          );
          if (!response.err) {
            setPlaylist(response);
            setSongs(response.tracks);
          }
        } catch (error) {
          console.error("Error fetching playlist:", error);
        }
      };
  
      fetchPlaylist();
    }, [playlistId]);

    
    const togglePlayPause = () => {
        if (Play) {
            setIsPlay(false);
        } else {
            setIsPlay(true);
        }
    };


  return (
    <LoggedInContainer>
        <div className="PlaylistPage">
          <div className="Header">
            <div className="ImageContainer">
              <img src={playlist.thumbnail} alt="Playlist Image" />
            </div>
            
            <div className="InfoContainer">
              <h1 id="playlistName">{playlist.name}</h1>
              <h2 id="playlistDesc">Description of the playlist</h2>
            </div>
            <div className="ActionButtons">
                <Icon icon= {Play?"solar:play-circle-bold":"solar:pause-circle-bold"} color="orange" style = {{fontSize: 50}} className='I' onClick={togglePlayPause} />
              <PlusSign onClick={()=>{
                
              }}/>
            </div>
          </div>
          <div className="SongList">
            <div className="Titles">
              <div className="NumberTitle">#</div>
              <div className="TitleTitle">Title</div>
              <div className="DateTitle">Date-Added</div>
            </div>
            <div className="SongContainer">
              {songs.map((item, index) => (
                  <div key={index} className="SongItem">
                    <h1>{item.name}</h1>
                  </div>
                ))}
            </div>
          </div>
        </div>
    </LoggedInContainer>
  );
}

export default PlaylistView;
