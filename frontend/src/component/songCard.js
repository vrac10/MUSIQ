import React from "react";
import './SongCard.css'

export default function SongCard(props){
    return(
        <div className="SongCards">
            <div className="SCimg">
                <img src={(props.imgSC)} alt="song card" width={223} height={200} />
            </div>
            <h1>{props.name}</h1>
        </div>
    )
}