import React from 'react'
import './Player.css' 
import {Footer, ProfileBody, SideBar} from '../../Components/index'
import { useStateValue } from '../../Context/StateProvider';
const Profil = ({spotify}) => {
  const [{ ShowMobileMenu}, dispatch] = useStateValue();

  return (
    <div className='player'>
      {ShowMobileMenu&&<div className='player-modal'>
        <SideBar />
      </div>}
      <div className="palyer-body">
        <SideBar />
        <ProfileBody spotify={spotify} />
      </div>
      <Footer spotify={spotify}/>
    </div>
  )
}

export default Profil