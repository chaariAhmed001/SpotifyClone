import React from 'react'
import { SideBarOption } from '..'
import './SideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useStateValue } from '../../Context/StateProvider';
const SideBar = () => {
  const [{ playlists }, dispatch] = useStateValue();
  
  return (
    <div className='sideBar-container'>
      <img className='sideBare-logo' src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify Logo" />
      <SideBarOption title='Home' Icon={HomeIcon} />
      <SideBarOption title='Search' Icon={SearchIcon} />
      <SideBarOption title='Your Library' Icon={LibraryMusicIcon} />
      <br />
      <strong className='sidebar-title'>YOUR PLAYLIST</strong>
      <hr />
      {playlists?.items?.map((playlist,key) => (
      
        <SideBarOption  key={key} title={playlist.name} id={playlist.id}/>

        
      ))}
      
      
    </div>
  )
}

export default SideBar