import SideBar from "./component/sidebar"
function search(){
    return (<div>
        <SideBar/>
        <div id="right">
            <div id="right_search">
                <h2 className="h">SEARCH</h2>
            </div>
            <div id="Inputs">
                <input type="text" id="songName" name="songName" 
                placeholder="   What do you want to listen to ?"  />
                <button id="searchButton"><h2>Search</h2></button>
            </div>
        </div>
        </div>
    )
}

export default search;