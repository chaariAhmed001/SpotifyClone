import axios from 'axios';
import React,{useEffect} from 'react'
import {FavoriteArtists, FirstSection,RecentlyPlayed} from '../../Components/index'
import { useStateValue } from "../../Context/StateProvider";
import './Home.css'
const Home = ({spotify}) => {
  const [{token,topArtists}, dispatch] = useStateValue();

  useEffect(() => {
    if (token) {
      spotify.getMyTopArtists().then((data)=>{
        dispatch({
          type: "GET_TOPARTISTS",
          topArtists: data,
        });
      })
    }
  },[token,dispatch])

  return (
    <div className='home-container'>
      <h2 className='section-title'>Good evening</h2>
      <FirstSection spotify={spotify} />
      <h2 className='section-title'>Recently Played</h2>
      <RecentlyPlayed spotify={spotify}/>
      <h2 className='section-title'>Your favorits artists</h2>
      <FavoriteArtists topArtists={topArtists?.items} spotify={spotify}/>
      
    </div>
  )
}

export default Home