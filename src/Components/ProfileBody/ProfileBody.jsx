import React, { useEffect } from 'react'
import { useStateValue } from '../../Context/StateProvider';
import {Header,Banner,SongsBody,AlbumDetails} from '../index'
import './ProfileBody.css'
import {Home,Artist, Search, CategoryPlaylists, SearchResults} from '../../Pages/index'
const ProfileBody = ({spotify}) => {
  
  const [{ token, selectedPlaylistId,selectedPlaylist , selectedRoote}, dispatch] = useStateValue();
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
      <Header spotify={spotify}/>
      {(selectedRoote === 'Player') &&
        <div className='player-container'>
          <Banner img={selectedPlaylist?.image?.url} title="PLAYLIST" subtitle={selectedPlaylist?.name} description={selectedPlaylist?.description}/>
          <SongsBody tracks={selectedPlaylist?.tracks} spotify={spotify}/>
        </div>
      }
      {selectedRoote === 'Home' && <Home spotify={spotify} />}
      {selectedRoote === 'Artist' && <Artist spotify={spotify} />}
      {selectedRoote === 'AlbumDetails' && <AlbumDetails spotify={spotify} />}
      {selectedRoote === 'Search' && <Search spotify={spotify} />}
      {selectedRoote === 'CategoryPlaylists' && <CategoryPlaylists spotify={spotify} />}
      {selectedRoote === 'SearchResults' && <SearchResults spotify={spotify} />}

    </div>
  )
}

export default ProfileBody