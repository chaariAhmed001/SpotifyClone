import React from 'react'
import './Banner.css'
import VerifiedIcon from '@mui/icons-material/Verified';
const Banner = ({img,title,subtitle,description,followers,prfImage,artistName,releseDate}) => {
  return (
    <div className='banner-container' >
        <img className='banner-img' src={img} alt="" />
        <div className='banner-body'>
            <strong className='banner-title'>{title==="Verified Artist"&& <VerifiedIcon className='verifiedIcon'/> }{title}</strong>
            <h2>{subtitle}</h2>
            {followers&&<span className='followers'>Followers: {followers}</span>}
            <p>{description}</p>
            {title==="ALBUM"&&
            <div className='albums-details'>
              <div className='artist-details'>
                <img src={prfImage} alt=""  />
                <p>{artistName}</p>
                <span>{releseDate}</span>
              </div>
            </div>}
        </div>
    </div>
  )
}

export default Banner