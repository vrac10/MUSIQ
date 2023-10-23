import "./sidebar.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar(props){

    const navigate = useNavigate();
    
    return (
        <div className="SideBar">
            <div className="field">
                <h1 className={"HOME_BUTTON " + props.HOME_BUTTON + " btn"} onClick={(e) => {
                    e.preventDefault()
                    navigate('/home');
                }}>Home</h1>
                <h1 className={"SEARCH_BUTTON " + props.SEARCH_BUTTON + " btn"} onClick={(e) => {
                    e.preventDefault()
                    navigate('/search');
                }}>Search</h1>
                <h1 className={"PLAYLISTS_BUTTON " + props.PLAYLISTS_BUTTON + " btn"} onClick={(e) => {
                    e.preventDefault()
                    navigate('/playlist');
                }}>Playlists</h1>
            </div>
        </div>
    );
}