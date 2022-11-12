import React from 'react'
import { useStateValue } from '../../Context/StateProvider';
import './SideBarOption.css'
const SIdeBarOption = ({title,Icon, id}) => {
  const [{selectedPlaylist}, dispatch] = useStateValue();
  const setCurrentPlayList = (playListID)=>{
    dispatch({
      type: "SET_SELECTEDPLAYLIST_ID",
      selectedPlaylistId: playListID,
    });
  }
  return (
    <div className='sideBarOption-container' onClick={() => setCurrentPlayList(id)} >
      {Icon &&<Icon />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  )
}

export default SIdeBarOption