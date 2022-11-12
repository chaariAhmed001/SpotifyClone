import React, { useEffect } from 'react';
import './Footer.css';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { useStateValue } from '../../Context/StateProvider';
import defaultImg from '../../Data/im.png'
const Footer = ({spotify}) => {
  const [{ playing,token,playerState }, dispatch] = useStateValue();

  useEffect(() => {
    spotify.getMyCurrentPlayingTrack().then((data) => 
      data !== '' && dispatch({
        type: "SET_PLAYING",
        playing: data,
      })
    )
    
  }, [dispatch,token])
  // skip songs, next songs , play song , pause songs , set Volum only for premium users
  const changeTrack = (state) =>{
    state === "next" && spotify.skipToNext();
    state ==="previous" && spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_PLAYER_STATE',
        playerState: true,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: r,
      });
    });

  }
  const handlePlayPause = () => {
    if (playerState) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYER_STATE",
        playerState: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYER_STATE",
        playerState: true,
      });
    }
  };
  const setVolume = (e)=>{
    spotify.setVolume(e.target.value)
  }
  return (
    <div className='fotter-container'>
      
    
      <div className='footter-SongDetails'>
          <img className='albomeImg' src={playing? ( playing?.item)?(playing?.item?.album?.images[2]?.url) :playing.image : defaultImg} alt="albomeImg"  />
          <div className="footer-songInfo">
            <h4>{( playing?.item)?playing?.item?.name : playing?.name }</h4>
            <p>{( playing?.item) ? playing?.item?.artists.map((artist) => artist.name).join(',') : playing?.artists?.map((artist)=>artist)}</p>
          </div>
      </div>
    
      <div className='fotter-PlayerContols'>
        <ShuffleIcon className='footer-icon' />
        <SkipPreviousIcon className='footer-icon' onClick={()=>changeTrack("previous")} />
        {playerState ? <PauseCircleFilledIcon  className='footer-icon' onClick={handlePlayPause}/> :  <PlayCircleOutlinedIcon className='footer-icon' onClick={handlePlayPause}/> }
        <SkipNextIcon className='footer-icon' onClick={()=>changeTrack("next")}/>
        <RepeatIcon className='footer-icon' />
      </div>
      <div className='footer-volumContols'>
        <Grid container spacing={2}>
          <Grid item><PlaylistPlayIcon className='footer-icon'/></Grid>
          <Grid item><VolumeDownIcon  className='footer-icon' /></Grid>
          <Grid item xs><Slider size="small" defaultValue={100} onChange ={ (e)=> setVolume(e) }/></Grid>
        </Grid>
      </div>
      
      
    </div>
  )
}

export default Footer