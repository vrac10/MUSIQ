import SongCard from "../component/SongCard";
import LoggedInContainer from "../containers/loggenInContainer";
import { makeUnauthenticatedGetRequest } from "../utils/serverHelper";
import './search.css';
import { useContext, useState } from "react";
import {Howl} from "howler";
import songContext from "../context/songContext";




function Search(){

    const [search,setSearch] = useState("")
    const [songs,setSongs] = useState([])
    
    const {
        setSong,
        setSongDetails,
        currentSong,
        setCurrentSong,
        isPaused,
        setCurrentIndex,
        setIsPaused,
    } = useContext(songContext);

    const playAudio = (item) => {
        if(currentSong != null){
            currentSong.pause();
            setCurrentIndex(0);
            setCurrentSong(null);
            setSong(null);
        }
        // const storageref = ref(storage)
        // const songsRef = ref(storageref,'Songs')
        // const audioFileRef = ref(songsRef,item.name + '.mp3');
        // getDownloadURL(audioFileRef)
       // .then((downloadURL) =>{

            const sound = new Howl({
                src: [item.track], 
                html5: true,
                onend: () => {
                    setIsPaused(true);
                }
          })
      
            sound.on('loaderror', function (error) {
                console.log('Error loading audio:', error);
              });
      
            sound.on('playerror', function (error) {
                console.log('Error playing audio:', error);
            });
      
            if(!isPaused){
                currentSong.pause();
                sound.play();
                setCurrentSong(sound);
                setSongDetails(songs);
            }
            else{
                sound.play();
                setIsPaused(false);   
                setCurrentSong(sound);
                setSongDetails(songs);
            }
            

        //})
        
          
      }


    const makeSearch = async () => {
            const route = "song/" + search;
            
        const response = await makeUnauthenticatedGetRequest(route);
        
        if(response && !response.err){
            setSongs(response)
            
        }
        else{
            console.log(response.err)
        }
    }

    
    return (
        
        <LoggedInContainer home = "Nclicked" search = "clicked" playlists = "Nclicked">
            <div className="rightSideSit">
        <div>
            <div id="right_search">
               <h2 className="h">SEARCH</h2>
            </div>

             <div id="Inputs">
                 <input type="text" id="songName" name="songName" 
                placeholder="What do you want to listen to ?"  value = {search} onChange={(e) => {setSearch(e.target.value)}}/>
                <button id="searchButton" onClick={(e) => {
                    e.preventDefault();
                    makeSearch();
                }}><h2 className="x">Search</h2></button>
            </div>
             <div className="SearchResult">
             
                 {songs.map((item) =>{
                     return (<SongCard 
                     key = {item._id}
                     name = {item.name}
                     imgSC = {item.thumbnail}
                     onClick={() => {
                        playAudio(item)
                 }}
                 />)})}
             </div>
          </div>
         </div>
        </LoggedInContainer>

    )
}

export default Search;