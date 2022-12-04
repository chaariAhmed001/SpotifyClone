import React from 'react'
import { Album } from '../../Components';
import { useStateValue } from '../../Context/StateProvider';
import './CategoryPlaylists.css'
const CategoryPlaylists = ({spotify}) => {
    const [{categoryPlayLists}, dispatch] = useStateValue();
   console.log(categoryPlayLists)
  return (
    <div className='top-albums'>
        <h2>Popular playlists</h2>
        <div className='albums-container'>
            {
              categoryPlayLists?.map((playList,index)=>(
                <Album  key={index} spotify={spotify} id={playList?.id} name={playList?.name} image={playList?.images?.[0].url} type='categoryPlayLists'/>
              ))
            }
        </div>
    </div>
  )
}

export default CategoryPlaylists