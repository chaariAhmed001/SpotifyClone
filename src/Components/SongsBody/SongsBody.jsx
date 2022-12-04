import React from 'react'
import './SongsBody.css'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useStateValue } from '../../Context/StateProvider';
const SongsBody = ({tracks,spotify}) => {
  const [{ }, dispatch] = useStateValue();

  const setTime = (ms) =>{
    const min = Math.floor((ms/60000) << 0);
    const sec = Math.floor((ms % 60000) / 1000).toFixed(0);
    return min+ ':' + (sec < 10 ? "0" : "") + sec
  }
  const setCurrentTrack = (track)=>{
    spotify.play(track)
    dispatch({
        type: "SET_PLAYING",
        playing: track,
      });
  }
  return (
    <div className='songsBody-container'>
        <div className="songsBody-icons">
            <PlayCircleFilledIcon className='shuffle-icon'/> 
            <FavoriteIcon fontSize='large'/>
            <MoreHorizIcon />
        </div>
        <div className='songsBody-tracks'>
            <TableContainer >
                <Table  aria-label="simple table">
                    <TableHead className='tab-header'>
                        <TableRow >
                            <TableCell align="left" style={{ width:30 ,paddingRight:0}}>#</TableCell>
                            <TableCell align="left" style={{width: 300, paddingLeft: 0}}>TITLE</TableCell>
                            <TableCell align="left" style={{width: 250}}>ALBUM</TableCell>
                            <TableCell align="left">DATEADED</TableCell>
                            <TableCell align="center"><AccessTimeIcon/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='traks'>
                        {
                            tracks?.map((track,index)=>(
                                <TableRow key={index} onClick={()=> setCurrentTrack(track)}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell style={{paddingLeft:0}}>
                                        <div className='song-details'>
                                            <img src={track?.image} alt={track?.album} />
                                            <div className='song-info'>
                                                <span className='song-name'>{track?.name}</span>
                                                <span className='song-artists'>{track?.artists}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{track?.album}</TableCell>
                                    <TableCell align='left'>{(track?.added_at).slice(0, 10)}</TableCell>
                                    <TableCell align='center'>{ setTime(track?.duration)}</TableCell>


                                </TableRow>
                                
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default SongsBody