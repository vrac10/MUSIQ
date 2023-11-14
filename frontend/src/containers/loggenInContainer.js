import SideBar from '../component/sidebar';
import songContext from '../context/songContext';
import '../Routes/Home.css';
import { Icon } from '@iconify/react';
import {useContext,useRef,useState} from 'react';

function LoggedInContainer({children, search, home , playlists}){
    const {
        song,
        songDetails,
        currentSong,
        setCurrentSong,
        currentIndex,
        setCurrentIndex,
        isPaused,
        setIsPaused,
    } = useContext(songContext);
    

    const togglePlayPause = () => {
        if(currentSong != null){    
            if(isPaused) {
                currentSong.play();
                setIsPaused(false);
            } else {
               currentSong.pause()
                setIsPaused(true);
            }
         }
      
    };

    const playNextSong = () => {
        if (song != null && song.length > 0){
            if (currentIndex < song.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextSong = songDetails.soundList[nextIndex];
        
            setCurrentIndex(nextIndex);
            currentSong.pause();
            setCurrentSong(nextSong);
            nextSong.seek(0);
            nextSong.play();
            }
    }
      };


      const [volume, setVolume] = useState(50); 

      const volumeInputRef = useRef(null);
      const handleVolumeChange = () => {
        const newVolume = volumeInputRef.current.value;
        setVolume(newVolume);
    
        if (currentSong) {
          currentSong.volume(newVolume / 100);
        }
      };

    const playPrevSong = () => {
        if (song != null && song.length > 0){
            if (currentIndex > 0) {
                const nextIndex = currentIndex - 1;
                const nextSong = songDetails.soundList[nextIndex];

                setCurrentIndex(nextIndex);
                currentSong.pause();
                setCurrentSong(nextSong);
                nextSong.seek(0);
                nextSong.play();
            }
    }
    }

    return (<div className='container'>
        <div className='main'>
            <SideBar SEARCH_BUTTON = {search} HOME_BUTTON = {home} PLAYLISTS_BUTTON = {playlists}/>
            {children}
        </div>
    <div className='down'>
        <div className='left'>
            <img src={songDetails[currentIndex].thumbnail} alt= "m" className='image'/>
                <div className='x'>
                    <div className= 'curtains' >{songDetails[currentIndex].name}</div>
                    <div className='name'>{songDetails[currentIndex].artist}</div>
                </div>
            </div>
            <div className='center'>
                <div className='icon'>
                    <Icon icon="solar:skip-previous-linear" color="white" className='icons' onClick={playPrevSong} />
                    <Icon icon= {isPaused?"solar:play-circle-bold":"solar:pause-circle-bold"} color="white" style = {{fontSize: 40}} className='icons' onClick={togglePlayPause} />
                    <Icon icon="solar:skip-next-linear" color="white" style= {{fontSize: 23}} className='icons' onClick={playNextSong}/>
                    
                </div>
                <div className='progressBar'>

                </div>
            </div>

            <div className='right'>
            <Icon icon="game-icons:speaker" color="white" fontSize={30}/>
                <input
                        type='range'
                        id='volume'
                        ref={volumeInputRef}
                        min='0'
                        max='100'
                        step='1'
                        value={volume}
                        onChange={handleVolumeChange}
                />
            </div>
        </div>
    </div>)
}

export default LoggedInContainer;