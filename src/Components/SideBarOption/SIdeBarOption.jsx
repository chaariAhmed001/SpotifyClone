import React from 'react'
import { useStateValue } from '../../Context/StateProvider';
import './SideBarOption.css'
const SIdeBarOption = ({title,Icon, id}) => {
  const [{}, dispatch] = useStateValue();
  const setCurrentPlayList = (playListID,root)=>{
    if(root==='Search'){
      dispatch({
        type:"SET_SEARCHINPUT",
        searchInput : true
      });
      dispatch({
        type: 'SET_SHOW_MENU',
        ShowMobileMenu: false
      }) ;
      dispatch({
        type:"SET_ROUTE",
        selectedRoote : 'Search'
      })
    }
    else if(root==='Home'){
      dispatch({
        type:"SET_SEARCHINPUT",
        searchInput : false
      });
      dispatch({
        type: 'SET_SHOW_MENU',
        ShowMobileMenu: false
      });
      dispatch({
        type:"SET_ROUTE",
        selectedRoote : 'Home'
      })

    }
    else{
      dispatch({
        type: "SET_SELECTEDPLAYLIST_ID",
        selectedPlaylistId: playListID,
      }); 
      dispatch({
        type: 'SET_SHOW_MENU',
        ShowMobileMenu: false
      });
      dispatch({
        type:"SET_ROUTE",
        selectedRoote : 'Player'
      })
    }
   
  }
  

  return (
    <div className='sideBarOption-container' onClick={() => setCurrentPlayList(id,title)} >
      {Icon &&<Icon />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  )
}

export default SIdeBarOption