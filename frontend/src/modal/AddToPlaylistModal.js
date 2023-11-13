import { useState } from 'react';
import './AddToPlaylistModal.css';
import { makeAuthenticatedPostRequest, makeUnauthenticatedGetRequest } from '../utils/serverHelper';
import logo from '../component/logo.png'
import PlusSign from '../component/plusSign';


export default function AddSong({isOpen,onClose, playlistid}){
    const [songNameHere, setSongNameHere] = useState("")
    const [actResponse,setActResponse] = useState([{name: "Song", thumbnail : logo,artist: "artist"}])
    const [condition,setCondition] = useState(true)
    if(!isOpen){
        return null;
    }

    const closeModal = () => {
        setCondition(true)
        setActResponse([{name: "Song", thumbnail : logo,artist: "artist"}])
        onClose();
    }


    const getSongsWithnName = async ()  => {
        const response = await makeUnauthenticatedGetRequest('song/'+songNameHere);

        if(response && !response.err){
            setActResponse(response);
        }
    }

    const AddSong = async () => {
        if(actResponse != null){
            const body = {playlistId : playlistid, songId : actResponse[0]._id}; 
            const addSong = await makeAuthenticatedPostRequest('playlist/add/song',body);
            
            if(addSong && !addSong.err){
                setCondition(false)
            }
        }
    }

    return(
        <div className='model-container'>
        <div className="div-addSong">
            <div className="Top-addSong">
                <div className='TitleOfTheModalAdd'><b>Add Song</b></div>
                <div>
                <svg id="close-addSong"  onClick = {closeModal}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                    </svg> 
                </div>
            </div>
            <div className="main-addSong">
            <div className='input-container'>
                <input type="text" id="txt-addSong" placeholder="Enter name" onChange={(e) => {
                    e.preventDefault();
                    setSongNameHere(e.target.value);
                }}></input>
                <button id="addSong-search" onClick={(e) => {
                    e.preventDefault();
                    getSongsWithnName();
                }}>Search</button>
            </div>
            </div>
            <div className="result-addSong">
                <img id="result-img" src={actResponse[0].thumbnail} alt="X"></img>
                <div className="result-info-addSong">
                    <div className='SongNameHere'>{actResponse[0].name}</div>
                    <div className='ArtistNameHere'>{actResponse[0].artist}</div>
                </div>
                <div className="actions-addSong">
                    {condition?<PlusSign onClick={(e) => {
                        AddSong();
                    }}/>: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">

                            <circle cx="12" cy="12" r="10" stroke="#5cb85c" stroke-width="2" fill="transparent" />


                            <line x1="7" y1="12" x2="11" y2="16" stroke="#5cb85c" stroke-width="4" />
                            <line x1="11" y1="16" x2="18" y2="8" stroke="#5cb85c" stroke-width="4" />
                            </svg>
                            }
                </div>
            </div>
        </div>
        </div>
    )
}