import React, { useState, useEffect } from "react";
import SongCard from "../component/SongCard";
import { makeAuthenticatedGetRequest } from "../utils/serverHelper";
import './playlist.css';
import LoggedInContainer from "../containers/loggenInContainer";

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
        <LoggedInContainer home = "Nclicked" search = "Nclicked" playlists = "clicked">
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
                            imgSC={item.thumbnail}
                        />
                    ))}
                </div>
            </div>
        </LoggedInContainer>
    )

}
export default Playlist;
