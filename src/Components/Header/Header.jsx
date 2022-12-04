import React, { useEffect, useState } from 'react'
import './Header.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useStateValue } from '../../Context/StateProvider';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({spotify}) => {
  const [{ user,searchInput,token,ShowMobileMenu}, dispatch] = useStateValue();
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    if (!search) return (

      dispatch({
        type: 'SET_ROUTE',
        selectedRoote: 'Search'
      }) 
      )
    let cancel = false
    spotify.search(search,['album','artist','playlist','track']).then((data) => 
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      SearchResults: data
    }));
    spotify.searchEpisodes(search).then(data=>
      dispatch({
      type: 'SET_SEARCH_RESULTS_EP',
      SearchResultsEp: (data?.episodes)
    }));
    spotify.searchShows(search).then(data=>dispatch({
      type: 'SET_SEARCH_RESULTS_SH',
      SearchResultsSh: (data?.shows?.items)
    }));
    dispatch({
      type: 'SET_ROUTE',
      selectedRoote: 'SearchResults'
    })  
    return () => (cancel = true)

  }, [token,dispatch,search])
  const showMenu = () =>{
    dispatch({
      type: 'SET_SHOW_MENU',
      ShowMobileMenu: !ShowMobileMenu
    }) 
  }  

return (
    <div className='header-contaier' >
      <div className='header-left'>
        <div className='header-menuIcon' onClick={()=>showMenu()}>
          <MenuIcon />
        </div>
        <div className='header-pagination'>
          <ArrowBackIosNewIcon className='pagination-prevButton'/>
          <ArrowForwardIosIcon className='pagination-NextButton'/>
        </div>
        {searchInput&&<div className="header-search">
          <SearchIcon className='search-icon'/>
          <input type="text" placeholder='What do you whant to listen to?' value={search} onChange={e => setSearch(e.target.value)} />
        </div> }
      </div>
      
      <div className="header-profil">
        <Avatar className='header-profilImg' src={user?.images[0]?.url} alt={user?.display_name} />
          <h4 className='profil-name'>{user?.display_name}</h4>
          <ArrowDropDownIcon />
      </div>
    </div>
  )
}

export default Header