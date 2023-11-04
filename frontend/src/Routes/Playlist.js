import React, { useState, useEffect } from "react"; // Import React and useEffect
import SideBar from "../component/sidebar";
import SongCard from "../component/SongCard";
import { makeAuthenticatedGetRequest } from "../utils/serverHelper";
import './playlist.css';

function Playlist() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
     
        async function fetchPlaylists() {
            try {
                const response = await makeAuthenticatedGetRequest('playlist/get/playlists');
                if (!response.err) {
                    setPlaylists(response);
                }
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        }

        fetchPlaylists();
    }, []);

    return (
        <div className="main2">
            <SideBar SEARCH_BUTTON="Nclicked" HOME_BUTTON="Nclicked" PLAYLISTS_BUTTON="clicked" />
            <div className="RightsPlaylist">
                <div className="headerSide">
                    <div className="PlaylistHeader">
                        PLAYLISTS
                    </div>
                    <div className="Buttonside">
                        <img src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" alt="add button" height={50} width={50} />
                    </div>
                </div>
                <div className="check">
                    {playlists.map((item) => (
                        <SongCard
                            key={item._id}
                            name={item.name}
                            imgSC="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Playlist;
