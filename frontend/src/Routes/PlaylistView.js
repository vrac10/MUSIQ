import { useContext, useEffect, useState } from "react";
import "./PlaylistView.css";
import LoggedInContainer from "../containers/loggenInContainer";
import { Icon } from '@iconify/react';
import PlusSign from "../component/plusSign";
import { makeAuthenticatedGetRequest, makeUnauthenticatedGetRequest } from "../utils/serverHelper";
import { useParams } from "react-router-dom";
import AddToPlaylistModal from '../modal/AddToPlaylistModal';
import songContext from "../context/songContext";
import {Howl} from 'howler'




function PlaylistView() {

    const [tracks,setTracks]= useState([])
    const [songs,setSongs] = useState([])
    const [playlist,setPlaylist] = useState({})
    const [thisModalOpen,setThisModalOpen] = useState(false)
 
    const {playlistId} = useParams();
    
    useEffect(() => {
      const fetchPlaylist = async () => {
        try {
          const response = await makeAuthenticatedGetRequest(
            `playlist/get/playlist/${playlistId}`
          );
          if (!response.err) {
            setPlaylist(response);
            setTracks(response.tracks);
          }
        } catch (error) {
          console.error("Error fetching playlist:", error);
        }
      };
  
      fetchPlaylist();
    }, [playlistId]);

    const {
      song,
      setSong,
      setSongDetails,
      currentSong,
      setCurrentSong,
      currentPlaylist,
      setCurrentPlaylist,
      currentIndex,
      setCurrentIndex,
      isPaused,
      setIsPaused,
  } = useContext(songContext);  

    useEffect(() => {
      const Getsongs = async () => {
        if (tracks.length > 0) {
          try {
            const promises = tracks.map(async (item) => {
              return await makeUnauthenticatedGetRequest(`song/get/${item}`);
            });
  
            const trackNames = await Promise.all(promises);
            setSongs(trackNames);
          } catch (error) {
            console.error("Error fetching songs:", error);
          }
        }
      };
  
      Getsongs();
      
      
    }, [tracks]);

    

    const playlistListening = async () => {
      if(currentSong !== null){
        currentSong.pause();
      }
      setCurrentPlaylist(playlistId)
      setSong(songs);
      try {
        const soundList = [];
    
        for (const song of songs) {

          try {
    
            const sound = new Howl({
              src: [song.track],
              onend: () => {
                setCurrentIndex(soundList.indexOf(sound));
                if (currentIndex < soundList.length - 1) {
                  const nextSound = soundList[currentIndex + 1];
                  setCurrentSong(nextSound);
                  nextSound.play();
                }
              },
            });
    
            soundList.push(sound);
          } catch (error) {
            console.error(`Error loading sound for ${song.name}: ${error}`);
          }
        }
    
        setSongDetails({
          ...songs,
          soundList,
        });
        if (soundList.length > 0) {
          setCurrentSong(soundList[0]);
          soundList[0].play();
          setIsPaused(false);
        }
      } catch (error) {
        console.error("Error loading playlist:", error);
      }

      
    };
    
    
    
    const togglePlayPause = () => {
        if(isPaused) {
            setIsPaused(false);
            if(currentSong != null && currentPlaylist === playlistId){
                currentSong.play();
            }
            else{
              setCurrentPlaylist(playlistId);
              playlistListening();
            }
        } else if(currentPlaylist !== playlistId){
          currentSong.pause();
          setCurrentPlaylist(playlistId);
          playlistListening();
          setIsPaused(false);
        }
        else {
          currentSong.pause();
          setIsPaused(true);
        }
    };
    

    const openTheAdderModal = () => {
      setThisModalOpen(true);
    };


  return (
    <LoggedInContainer home = "Nclicked" search = "Nclicked" playlists = "clicked">
        <div className="PlaylistPage">
          <div className="Header">
            <div className="ImageContainer">
              <img src={playlist.thumbnail} alt="Playlist" />
            </div>
            
            <div className="InfoContainer">
              <h1 id="playlistName">{playlist.name}</h1>
              <h2 id="playlistDesc">Description of the playlist</h2>
            </div>
            <div className="ActionButtons">
                <Icon icon= {((currentPlaylist === playlistId || (currentPlaylist === null && song !== null)) && !isPaused)?"solar:pause-circle-bold" : "solar:play-circle-bold"} color="#d35f12" style = {{fontSize: 30}} className='I' onClick={togglePlayPause} />
              <PlusSign onClick={openTheAdderModal}/>
            </div>
          </div>
          
          <div className="SongList">
            <div className="Titles">
              <div className="NumberTitle">#</div>
              <div className="TitleTitle">Title</div>
             <div className="DateTitle">Date-Added</div>
            </div>
            <div className="SongContainer">
              {songs.map((item,index) => (
                  <div key={index} className="SongItem">
                    <div className="key">
                      <h1>{index+1}</h1>
                    </div>
                    <img src={item.thumbnail} width={50} height={50} alt="Cover"/>
                    <div className="newH1">
                      <h1>{item.name}</h1>
                      <h2>{item.artist}</h2>
                    </div>
                    {/* <div>
                    {s}
                    </div> */}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <AddToPlaylistModal isOpen={thisModalOpen} onClose={() => setThisModalOpen(false)} playlistid={playlistId}/>
    </LoggedInContainer>
  );
}

export default PlaylistView;
