import "./sidebar.css";
import React from "react";

export default function SideBar(){

    // const BtnList = document.querySelectorAll('.btn');

    // BtnList.forEach(btn => {
    //     btn.addEventListener('click',()=>{
    //         document.querySelectorAll('.clicked').classList.add('.Nclicked');
    //         document.querySelectorAll('.clicked').classList.remove('.clicked');
    //         btn.classList.add('.clicked');
    //         btn.classList.remove('.Nclicked');
    //         console.log(BtnList);
    //     })
    // })

    return (
        <div className="SideBar">
            <div className="field">
                <h1 className="HOME_BUTTON clicked btn">Home</h1>
                <h1 className="SEARCH_BUTTON Nclicked btn">Search</h1>
                <h1 className="PLAYLISTS_BUTTON Nclicked btn">Playlists</h1>
            </div>
        </div>
    );
}