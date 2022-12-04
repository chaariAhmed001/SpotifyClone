import React from 'react'
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../Context/StateProvider';
import './SideBarOption.css'
const SIdeBarOption = ({title,Icon, id}) => {
  const [{}, dispatch] = useStateValue();
  const setCurrentPlayList = (playListID)=>{
    dispatch({
      type: "SET_SELECTEDPLAYLIST_ID",
      selectedPlaylistId: playListID,
    });
  }
  const setRoute = (roote)=>{
    dispatch({
      type:"SET_ROUTE",
      selectedRoote : roote
    })
    if(roote==='Search'){
      dispatch({
        type:"SET_SEARCHINPUT",
        searchInput : true
      })
    }
    else{
      dispatch({
        type:"SET_SEARCHINPUT",
        searchInput : false
      })
    }
  }

  return (
    <div className='sideBarOption-container' onClick={() => setCurrentPlayList(id)} >
      {Icon &&<Icon />}
      {Icon ? <h4 onClick={()=>{setRoute(title)}}>{title}</h4> : <p>{title}</p>}
    </div>
  )
}

export default SIdeBarOption