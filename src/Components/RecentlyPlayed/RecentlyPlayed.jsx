import React, { useEffect,useState } from 'react'
import { useStateValue } from '../../Context/StateProvider';
import Album from '../Album/Album';
import './RecentlyPlayed.css'
const RecentlyPlayed = ({spotify}) => {

    const [{token,ScreenSize}, dispatch] = useStateValue();
    const [playedSongs, setPlayedSongs] = useState([])
    useEffect(() => {
        spotify.getMyRecentlyPlayedTracks().then((data) => setPlayedSongs(data?.items));
    }, [token,dispatch])
  return (
    <div className='albums-container'>
      {
        playedSongs.map((data,index)=>(
          (ScreenSize > 900 ? index <=4 : index<=3) && <Album  key={index} spotify={spotify} id={data?.track?.id} name={data?.track?.name} image={data?.track?.album?.images?.[1].url} type='track'/>
        ))
      }
    </div>
  )
}

export default RecentlyPlayed