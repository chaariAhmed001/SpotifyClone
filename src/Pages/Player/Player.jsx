import React, { useContext, useRef, useState } from 'react'
import './Player.css' 
import {Footer, ProfileBody, SideBar} from '../../Components/index'
const Profil = ({spotify}) => {

  return (
    <div className='player'>
      <div className="palyer-body">
        <SideBar />
        <ProfileBody spotify={spotify} />
      </div>
      <Footer spotify={spotify}/>
    </div>
  )
}

export default Profil