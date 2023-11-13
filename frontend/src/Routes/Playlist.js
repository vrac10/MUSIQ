import React, { useState, useEffect } from "react";
import SongCard from "../component/SongCard";
import { makeAuthenticatedGetRequest } from "../utils/serverHelper";
import './playlist.css';
import songContext from "../context/songContext.js";
import PlusSign from "../component/plusSign.js";
import LoggedInContainer from "../containers/loggenInContainer";
import PlaylistModal from "../modal/PlaylistModal.js";
import { useNavigate } from "react-router-dom";

function Playlist() {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate(); 

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


    const openModal = () => {
        setIsModalOpen(true);
      };
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <LoggedInContainer home = "Nclicked" search = "Nclicked" playlists = "clicked">
            <div className="RightsPlaylist">
                <div className="headerSide">
                    <div className="PlaylistHeader">
                        <b>PLAYLISTS</b>
                    </div>
                    <div className="Buttonside">
                       <PlusSign onClick={openModal} />
                    </div>
                </div> 
                <div className="check">
                   
                    {playlists.map((item) => (
                        <SongCard
                            key={item._id}
                            name={item.name}
                            imgSC={item.thumbnail}
                            onClick = {() => {
                                navigate('/playlist/'  + item._id)
                            }}
                                
                        />
                    ))}
                    
                </div>
            </div>
            <PlaylistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </LoggedInContainer>
    )

}
export default Playlist;
