import SongCard from "../component/SongCard";
import SideBar from "../component/sidebar"
import LoggedInContainer from "../containers/loggenInContainer";
import { makeUnauthenticatedGetRequest } from "../utils/serverHelper";
import './search.css';
import { useState } from "react";

function Search(){

    const [search,setSearch] = useState("")
    const [song,setSong] = useState([])

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
                     />)
                 })}
             </div>
          </div>
         </div>
        </LoggedInContainer>

    )
    // return (<div className="main">
    //     <SideBar SEARCH_BUTTON = "clicked" HOME_BUTTON = "Nclicked" PLAYLISTS_BUTTON = "Nclicked" />
    //     <div className="rightSideSit">
    //     <div>
    //         <div id="right_search">
    //             <h2 className="h">SEARCH</h2>
    //         </div>

    //         <div id="Inputs">
    //             <input type="text" id="songName" name="songName" 
    //             placeholder="What do you want to listen to ?"  value = {search} onChange={(e) => {setSearch(e.target.value)}}/>
    //             <button id="searchButton" onClick={(e) => {
    //                 e.preventDefault();
    //                 makeSearch();
    //                 console.log(song)
    //             }}><h2 className="x">Search</h2></button>
    //         </div>
    //     </div>
    //         <div className="SearchResult">
    //             {song.map((item) =>{
    //                 return (<SongCard 
    //                 key = {item._id}
    //                 name = {item.name}
    //                 imgSrc = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2F7_Rings&psig=AOvVaw1jkmNLMhGER0w9ilQAui8c&ust=1699170625849000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCbqP7tqYIDFQAAAAAdAAAAABAE"
    //                 />)
    //             })}
    //         </div>
    //     </div>
    //     </div>
   // )
}

export default Search;