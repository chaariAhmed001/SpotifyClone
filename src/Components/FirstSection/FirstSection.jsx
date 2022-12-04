import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../Context/StateProvider';
import './FirstSection.css'
const FirstSection = ({spotify}) => {
    const [{token}, dispatch] = useStateValue();
    const [playList, setPlayList] = useState([]);
    const [artist, setartist] = useState([]);
    const [albums, setalbums] = useState([])
    useEffect(() => {
    spotify.getUserPlaylists().then(data => setPlayList(data?.items));
    spotify.getMyTopArtists().then((data) => setartist(data?.items));
    spotify.getMySavedAlbums().then((data) => setalbums(data?.items));

    }, [token,dispatch])
    const redericte =(type,id,index)=>{
      if(type === 'playlist') {
        spotify.getPlaylist(id).then(async (data) => {

        const playlist = {
          id: data?.id,
          name: data?.name,
          image: data?.images?.[0],
          description : data?.description,
          tracks : data?.tracks?.items.map(({track,added_at})=>({ // data : {... track , ....} : selecte the track object
            id: track?.id,
            name: track?.name,
            artists: track?.artists?.map((artist)=>artist.name),
            image: track?.album?.images[2].url,
            duration: track?.duration_ms,
            album: track?.album.name,
            context_uri: track?.album.uri,
            track_number: track?.track_number,
            added_at:added_at
          }))  
        }
        dispatch({
          type : "SET_SelectedPlayList",
          selectedPlaylist: playlist
        })
        dispatch({
          type: 'SET_ROUTE',
          selectedRoote: 'Player'
      })
      })
    }  
    else if (type === 'artist'){
      dispatch({
        type: 'SET_SELECTED_ARTIST',
        selectedArtist: id
    })
    dispatch({
        type: 'SET_ROUTE',
        selectedRoote: 'Artist'
    })
    }
    else if (type === 'album'){
      dispatch({
        type: "SET_SELECTED_Album",
        selectedAlbum: id,
      }); 
      dispatch({
        type: 'SET_ROUTE',
        selectedRoote: 'AlbumDetails'
    })
    } 
    }
    const Container =({img,name,type,id,index})=>{
      return(
        <div className='playList-container' onClick={()=>redericte(type,id,index)}>
          <img src={img} alt={name}  />
          <p>{name}</p>
        </div>
      )   
    }
  return (
    <div className='firstSection-container'>
      <div className='playLists-conainer'>
      {
      playList?.map((playList,index)=>(
        index<=1 && <Container key={index} index={index} img={playList?.images?.[0].url} name={playList?.name} id={playList?.id} type='playlist'/>
      ))
      }
      {
      artist?.map((artist,index)=>(
        index<=1 && <Container key={index} index={index} img={artist?.images?.[2].url} name={artist?.name} type='artist' id={artist?.id}/>
      ))
      }
      {
      albums?.map((album,index)=>(
        index<=1 && <Container key={index}  img={album?.album?.images?.[2].url} name={album?.album?.name} type='album' id={album?.album?.id}/>
      ))
      }
      </div>
    </div>
  )
}

export default FirstSection