import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React,{useEffect, useState} from 'react'
import { useStateValue } from '../../Context/StateProvider';
import {Banner} from '../index';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import './Album.css'
const AlbumDetails = ({spotify}) => {
  const [{ token,selectedAlbum}, dispatch] = useStateValue();
  const [album, setAlbum] = useState({})
  console.log(album)
  useEffect(() => {
    spotify.getAlbum(selectedAlbum).then((data)=>{setAlbum(data)})
  }, [token,dispatch])
  const setTime = (ms) =>{
    const min = Math.floor((ms/60000) << 0);
    const sec = Math.floor((ms % 60000) / 1000).toFixed(0);
    return min+ ':' + (sec < 10 ? "0" : "") + sec
  }
  const setCurrentTrack = (trackId)=>{
    spotify.getTrack(trackId).then((track)=>
  {
    const selectedTrack = {
      id: track?.id,
      name: track?.name,
      artists: track?.artists?.map((artist)=>artist.name),
      image: track?.album?.images[2].url,
      duration: track?.duration_ms,
      album: track?.album.name,
      context_uri: track?.album.uri,
      track_number: track?.track_number,
    }
    spotify.play(selectedTrack)
    dispatch({
    type: "SET_PLAYING",
     playing: selectedTrack,
    });
  }  
  )
  }
  return (
    <div className='albumDetails-container'>
        <Banner img={album?.images?.[1].url} title="ALBUM" subtitle={album?.name} prfImage={album?.images?.[2].url} artistName={album?.artists?.[0].name} releseDate={album?.release_date}/>
        <div className='songsBody-tracks'>
            <TableContainer >
                <Table  aria-label="simple table">
                    <TableHead className='tab-header'>
                        <TableRow >
                            <TableCell align="left" style={{ width:30 ,paddingRight:0}}>#</TableCell>
                            <TableCell align="left" style={{width: 300, paddingLeft: 0}}>TITLE</TableCell>
                            <TableCell align="right"><AccessTimeIcon /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='traks'>
                        {
                            album?.tracks?.items?.map((track,index)=>(
                                <TableRow key={index}  onClick={()=> setCurrentTrack(track?.id)}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell style={{paddingLeft:0}}>
                                      {track?.name}
                                    </TableCell>
                                    <TableCell align='right'>{ setTime(track?.duration_ms)}</TableCell>
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

export default AlbumDetails