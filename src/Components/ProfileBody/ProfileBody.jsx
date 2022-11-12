import React, { useEffect, useRef, useState } from 'react'
import { useStateValue } from '../../Context/StateProvider';
import {Header,Banner,SongsBody} from '../index'
import './ProfileBody.css'
const ProfileBody = ({spotify}) => {
  
  const [{ token, selectedPlaylistId,selectedPlaylist}, dispatch] = useStateValue();
  useEffect(() => {
    if(token && selectedPlaylistId){
      spotify.getPlaylist(selectedPlaylistId).then(async (data) => {
         const playList = {
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
          selectedPlaylist: playList
        })
        
      });
      
    }
  }, [dispatch,token,selectedPlaylistId]);

  return (
    <div className='profileBody-container'>
      <Header />
      <Banner img={selectedPlaylist?.image?.url} title="PLAYLIST" subtitle={selectedPlaylist?.name} description={selectedPlaylist?.description}/>
      <SongsBody tracks={selectedPlaylist?.tracks} spotify={spotify}/>
    </div>
  )
}

export default ProfileBody