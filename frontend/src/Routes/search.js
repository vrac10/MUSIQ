import SideBar from "../component/sidebar"
import './search.css';

function search(){
    return (<div className="main">
        <SideBar SEARCH_BUTTON = "clicked" HOME_BUTTON = "Nclicked" PLAYLISTS_BUTTON = "Nclicked" />
        <div>
            <div id="right_search">
                <h2 className="h">SEARCH</h2>
            </div>
            <div id="Inputs">
                <input type="text" id="songName" name="songName" 
                placeholder="What do you want to listen to ?"  />
                <button id="searchButton"><h2 className="x">Search</h2></button>
            </div>
        </div>
        </div>
    )
}

export default search;