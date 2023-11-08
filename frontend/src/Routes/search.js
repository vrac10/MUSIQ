import SongCard from "../component/SongCard";
import SideBar from "../component/sidebar"
import LoggedInContainer from "../containers/loggenInContainer";
import { makeUnauthenticatedGetRequest } from "../utils/serverHelper";
import './search.css';
import { useState } from "react";
import {Howl, Howler} from "howler";
import { storage } from "../utils/firebase";
import {ref, getDownloadURL} from "firebase/storage";


function Search(){

    const [search,setSearch] = useState("")
    const [song,setSong] = useState([])
    const [isPlaying,setIsPlaying] = useState(false)


    const playAudio = (item) => {
        // Get the download URL for the audio file from Firebase Storage
        const storageref = ref(storage)
        const songsRef = ref(storageref,'Songs')
        const audioFileRef = ref(songsRef,item.name + '.mp3');
        getDownloadURL(audioFileRef)
        .then((downloadURL) =>{

            const sound = new Howl({
                src: [downloadURL], // Use the download URL as the audio source
                html5: true,
          });
      
          sound.on('loaderror', function (error) {
                console.log('Error loading audio:', error);
              });
      
          sound.on('playerror', function (error) {
                console.log('Error playing audio:', error);
            });
      
             sound.play();

        })
        
          
      }


    const makeSearch = async () => {
            const route = "song/" + search;
            
        const response = await makeUnauthenticatedGetRequest(route);
        
        if(response && !response.err){
            setSong(response);
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
                 {song.map((item) =>{
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