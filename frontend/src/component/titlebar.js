import './titlebar.css';
import logo from './logo.png';



function titlebar(){
    return <div id="titlebar">
            <img src={logo} width="73px" height="66px" alt = "img" />
            <h1>MUSIQ</h1>
        </div>
        
}

export default titlebar;