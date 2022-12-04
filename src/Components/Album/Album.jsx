import React from 'react'
import { useStateValue } from '../../Context/StateProvider';
import './Album.css'
const Album = ({id,name,image,releaseDate,spotify,type,by}) => {
  const [{ }, dispatch] = useStateValue();

  const setPlayList =(id) =>{
    if(type === 'playlist'){
      dispatch({
        type: "SET_SELECTED_Album",
        selectedAlbum: id,
      }); 
        dispatch({
          type: 'SET_ROUTE',
          selectedRoote: 'AlbumDetails'
      })
    }
    else if(type == 'track'){
      spotify.getTrack(id).then(track=>{
        const cureetPlayed = { 
          id: track?.id,
          name: track?.name,
          artists: track?.artists?.map((artist)=>artist.name),
          image: track?.album?.images[2].url,
          duration: track?.duration_ms,
          album: track?.album.name,
          context_uri: track?.album.uri,
          track_number: track?.track_number,
        }
        dispatch({
          type: "SET_PLAYING",
          playing: cureetPlayed,
        });
      })
    }  
    else if(type == 'categoryPlayLists'){
      dispatch({
        type: "SET_SELECTEDPLAYLIST_ID",
        selectedPlaylistId: id,
      });
      dispatch({
        type: 'SET_ROUTE',
        selectedRoote: 'Player'
    })
    
    }
    else if(type == 'episode'){
      spotify.getEpisode(id).then(episode => {
        const cureetPlayed = { 
          id: episode?.id,
          name: episode?.name,
          publisher: episode?.show?.publisher,
          image: episode?.images[2].url,
          duration: episode?.duration_ms,
          album: episode?.show?.name,
          context_uri: episode?.uri,
        }
        dispatch({
          type: "SET_PLAYING",
          playing: cureetPlayed,
        })
      }
      )

    }
  }
  
  return (
    <div className='album-container' onClick={()=>setPlayList(id)}>
        <img src={image} alt={name}/>
        <div className='card-body'>
            <h4>{name}</h4>
            <p>{releaseDate}</p>
            {by&&<span>By {by}</span>}
        </div>
    </div>
  )
}

export default Album