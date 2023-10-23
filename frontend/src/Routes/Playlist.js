import SideBar from "../component/sidebar";
import SongCard from "../component/songCard";
import TitleBar from '../component/titlebar';

function Playlist(){
    return <div className="main">
     <SideBar SEARCH_BUTTON = "Nclicked" HOME_BUTTON = "Nclicked" PLAYLISTS_BUTTON = "clicked" />
     <div className="check">
        <SongCard/>
    </div>
    </div>
}

export default Playlist;