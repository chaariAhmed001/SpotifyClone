import React from 'react'
import './Banner.css'
const Banner = ({img,title,subtitle,description}) => {
  return (
    <div className='banner-container'>
        <img className='banner-img' src={img} alt="" />
        <div className='banner-body'>
            <strong>{title}</strong>
            <h2>{subtitle}</h2>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default Banner