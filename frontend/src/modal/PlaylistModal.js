import { useState } from 'react';
import './PlaylistModal.css'
import { makeAuthenticatedPostRequest } from '../utils/serverHelper';

export default function AddPlaylists({isOpen, onClose}){
    const [playlistName, setPlaylistName] = useState("")
    if(!isOpen){
        return null;
    }

    const closeModal = () =>{
        onClose();
    }

    const savePlaylist = async () => {
        var body = {name : playlistName, tracks : [], thumbnail : "https://cdn.getmidnight.com/b5a0b552ae89a91aa34705031852bd16/2022/08/1_1---2022-08-24T165236.013-1.png"}
        const response = await makeAuthenticatedPostRequest('playlist/create',body);

        if(response && !response.err){
            console.log(response);
            onClose();
        }
        else{
            console.log(response.err);
        }
    }

    return(
        <div className="modal-container">
        <div className="div-addPlaylists">
            <div className="Top-addPlaylists">
            <div className="titleOfEdit">
                <b>Edit Details</b>
            </div>
                {/* <img id="close-addPlaylists" src="logo192.png" alt="X" onClick={closeModal}/> */}
                <svg id="close-addPlaylists"  onClick = {closeModal}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>
            <div className="main-addPlaylists">
                <div className="img-addPlaylists">
                    <img src="logo192.png" alt="NoImageYet"/>
                </div>
                <div className="input-addPlaylists">
                    <input type="text" id="txt-addPlaylists" placeholder="Enter name" onChange={(e) => {
                        e.preventDefault();
                        setPlaylistName(e.target.value);
                    }}/>
                    <textarea id="txtarea-addPlaylists" rows="8" cols="30" placeholder="Add description">
                    </textarea>
                </div>
            </div>
            <div className="savebtn-addPlaylists">
                <button id="save-addPlaylists" onClick={savePlaylist}>Save</button>
            </div>
        </div>
        </div>
    )
}
