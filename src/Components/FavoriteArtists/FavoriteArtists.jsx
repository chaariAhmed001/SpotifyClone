import React from 'react'
import './FavoriteArtists.css'
import { useStateValue } from '../../Context/StateProvider';
const FavoriteArtists = ({topArtists}) => {
  const [{ ScreenSize}, dispatch] = useStateValue();
    const setCurrentPlayList = async (id)=>{
        dispatch({
            type: 'SET_SELECTED_ARTIST',
            selectedArtist: id
        })
        dispatch({
            type: 'SET_ROUTE',
            selectedRoote: 'Artist'
        })
    }
    
  return (
    <div className='topArtists-conainer'>
        { topArtists?.map((artist,key) => ( 
            key <=4 &&
            (ScreenSize > 900 ? key <=4 : key<=3) && <div key={key} className='artist-container' onClick={()=>{setCurrentPlayList(artist.id)}}>
                <img src={artist?.images?.[1].url} alt=""  />
                <strong>{artist?.name}</strong>
                <p>Artist</p>
            </div>
        ))}
      </div>
  )
}

export default FavoriteArtists