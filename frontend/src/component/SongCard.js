import React from "react";
import './SongCard.css'

export default function SongCard({imgSC, name , onClick}){

    const perform = () => {
        onClick();
    }
    return(
        <div className="SongCards" onClick={perform}>
            <div className="SCimg">
                <img src={(imgSC)} alt="song card" width={223} height={200} className="imgOfSong"/>
            </div>
            <h1 className="n">{name}</h1>
           
        </div>
    )
}
