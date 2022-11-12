import React from 'react'
import './Header.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useStateValue } from '../../Context/StateProvider';

const Header = () => {
const [{ user }, dispatch] = useStateValue();

  return (
    <div className='header-contaier' >
      <div className='header-left'>
        <div className='header-pagination'>
          <ArrowBackIosNewIcon className='pagination-prevButton'/>
          <ArrowForwardIosIcon className='pagination-NextButton'/>
        </div>
        <div className="header-search">
          <SearchIcon className='search-icon'/>
          <input type="text" placeholder='What do you whant to listen to?' />
        </div> 
      </div>
      
      <div className="header-profil">
        <Avatar className='header-profilImg' src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
        <ArrowDropDownIcon />
      </div>
    </div>
  )
}

export default Header