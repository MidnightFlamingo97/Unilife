import React from 'react'
import './Banner.css'
import bannerBackground from '../../assets/cover-img.png'

const Banner = ({title, subTitle}) => {
  return (
    <div className='banner'>
        <div className='banner-txt'>
            <h1>{title}</h1>
            <p>{subTitle}</p>
        </div>
        <div className='banner-background-img' style={{backgroundImage:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bannerBackground})`}}></div>
    </div>
  )
}

export default Banner