import React, { useEffect, useState } from 'react'
import { SideBarOption } from '..'
import './SideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useStateValue } from '../../Context/StateProvider';
import CancelIcon from '@mui/icons-material/Cancel';
const SideBar = () => {
  const [{ playlists,ShowMobileMenu,ScreenSize }, dispatch] = useStateValue();
  const [screenSize, setScreenSize] = useState()
  const cancelMobileMenu = ()=>{
    dispatch({
      type: 'SET_SHOW_MENU',
      ShowMobileMenu: false
    }) 
  }

  useEffect(() => {
    if (ScreenSize > 600) {
      dispatch({
        type: 'SET_SHOW_MENU',
        ShowMobileMenu: false
      }) 
    } 
  }, [ScreenSize])
  return (
    <div className='sideBar-container'>
      <div className='header-top'>
        <img className='sideBare-logo' src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify Logo" />
        {ShowMobileMenu &&
        <div className='cancel-btn' onClick={()=>cancelMobileMenu()}>
          <CancelIcon />
        </div>}
      </div>
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