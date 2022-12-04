import React, { useEffect, useState } from 'react'
import './SearchCategory.css'
import { shuffle } from 'lodash';
import { useStateValue } from '../../Context/StateProvider';

const SearchCategory = ({title,img,id,spotify}) => {
    const [{}, dispatch] = useStateValue();

    const setPlayList=(id)=>{
        spotify.getCategoryPlaylists(id).then((data) => {
            dispatch({
                type : "SET_CATEGORY_PLAYLIST",
                categoryPlayLists: data?.playlists?.items
            })
            dispatch({
                type : "SET_ROUTE",
                selectedRoote: 'CategoryPlaylists'
            })
        });
        dispatch({
            type: 'SET_SEARCHINPUT',
            selectedRoote: false
        })

    }
  return (
    <div className='category-container' style={{backgroundImage: `url(${img})`,backgroundSize:"contain" }} onClick={()=>setPlayList(id)}>
        <div className='category-titele'>
            <span>{title}</span>
        </div>
    </div>
  )
}

export default SearchCategory