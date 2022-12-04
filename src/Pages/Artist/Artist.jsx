import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { Album, Banner, FavoriteArtists } from '../../Components/index';
import { useStateValue } from '../../Context/StateProvider';
import './Artist.css'
const Artist = ({spotify}) => {
  const [{ token,selectedArtist,user,ScreenSize}, dispatch] = useStateValue();
  const [topTracks, setTopTraks] = useState([])
  const [artist, setArtist] = useState({})
  const [topArtistAlbums, setTopArtistAlbums] = useState([])
  const [fansArtists, setFansArtists] = useState([])
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
    useEffect(() => {
        if (token) {
            spotify.getArtistTopTracks(selectedArtist,user?.country).then((data)=> setTopTraks(data?.tracks))
            spotify.getArtist(selectedArtist).then((data)=>setArtist(data));
            spotify.getArtistAlbums(selectedArtist).then(data=> setTopArtistAlbums(data?.items));
            spotify.getArtistRelatedArtists(selectedArtist).then(data => setFansArtists(data))
        }
        
    }, [dispatch,token])
  return (
    <div className='selectedArtist-container'>
        <Banner img={artist?.images?.[1].url} title="Verified Artist" subtitle={artist?.name} followers={artist?.followers?.total} description={`Genres: ${artist?.genres?.join(', ')}`}/>
        <div className='popular-tracks'>
          <h2>Popular</h2>
          <TableContainer> 
            <Table aria-label="simple table">
              <TableBody className='traks'>
                {
                  topTracks?.map((track,index)=>(
                    <TableRow key={index} onClick={()=> setCurrentTrack(track?.id)}>
                      <TableCell style={{ width:30 ,paddingRight:0}}>{index+1}</TableCell>
                      <TableCell style={{paddingLeft:0}} >
                        <div className='song-details'>
                          <img src={track?.album?.images?.[2].url} alt={track?.album} />
                          <span className='song-name'>{track?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{track?.album?.name}</TableCell>
                      <TableCell align='center'>{ setTime(track?.duration_ms)}</TableCell>
                    </TableRow>        
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='top-albums'>
          <h2>Albums</h2>
          <div className='albums-container'>
            {
              topArtistAlbums?.map((album,index)=>(
                album?.album_group==="album" &&(ScreenSize > 900 ? index <=4 : index<=3) &&
                <Album  key={index} spotify={spotify} id={album?.id} name={album?.name} image={album?.images?.[1].url} releaseDate={album?.release_date}/>
              ))
            }
             
          </div>
        </div>
        <div className='fansLikes-container'>
          <h2>Fans also like</h2>
          <FavoriteArtists topArtists={fansArtists?.artists}/>
        </div>
    </div>
  )
}

export default Artist