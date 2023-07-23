import React, { useEffect, useState } from 'react'
import './HomeDetails.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {LiaBedSolid, LiaBathSolid} from 'react-icons/lia';
import {AiOutlineHeart} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'

const HomeDetails = () => {

    const {homeId} = useParams();

    const [home, setHome] = useState('');
    const [homeImages, setHomeImages] = useState([]);

    useEffect(()=>{
        axios.get(`https://unilife-server.herokuapp.com/properties/${homeId}`)
        .then(res => {
          setHome(res.data);
          setHomeImages(res.data.images);
        })
        .catch(err => console.log(err))
    },[])

  return (
    <main className='home-detail-page'>
        <Link to={`/city-details/${home.city_id?._id}`} className='back-link'>{`< Back to Search`}</Link>

        <div className='home-main-info-container'>
          <div className='home-images'>
            <img className='home-main-img' src={homeImages[0]} />
            <div className='sub-img-container'>
              {
                homeImages.filter((item, i) => i > 0).map(item => <img key={item} className='sub-img' src={item} />)
              }
            </div>
          </div>

          <div className='home-main-info'>
              <div className='home-main-info-details'>
                <address className='h2-address'>{home.address?.street}, {home.address?.city}, {home.address?.postcode}</address>
                <div className='detail-icon-grid'>

                  <div className='detail-icon-container'>
                    <p>Bedrooms</p>
                    <div className='detail-icon'>
                      <LiaBedSolid />
                      <h1>{home.bedroom_count}</h1>
                    </div>
                  </div>

                  <div className='detail-icon-container'>
                    <p>Bathrooms</p>
                    <div className='detail-icon'>
                      <LiaBathSolid />
                      <h1>{home.bathroom_count}</h1>
                    </div>
                  </div>

                  <div className='detail-icon-container'>
                    <p>Property Type</p>
                    <div className='detail-icon'>
                      <h2>{home.property_type}</h2>
                    </div>
                  </div>

                  <div className='detail-icon-container'>
                    <p>Price</p>
                    <div className='detail-icon'>
                      <h1>£{home.rent}</h1>
                    </div>
                  </div>

                  <div className='detail-icon-container'>
                    <p>Furnished Type</p>
                    <div className='detail-icon'>
                      <h2>{home.furnished}</h2>
                    </div>
                  </div>

                  <div className='detail-icon-container'>
                    <p>Available From</p>
                    <div className='detail-icon'>
                      <h2>{home.availability}</h2>
                    </div>
                  </div>

                </div>
              </div>
              <div className='home-info-btn-container'>
                <button className='shortlist-btn'>
                  <AiOutlineHeart className='shortlist-hrt'/>
                  Shortlist
                </button>
                <button>Book Viewing</button>
              </div>
          </div>
        </div>

        <div className='home-extra-info-container'>

          <div className='desc-and-feature-container flex-spacing'>
            <div className='information-container'>
                <h2>Description</h2>
                <p>{home?.property_description}</p>
            </div>
            <div className='information-container'>
              <h2>Key Features</h2>
              {
                home.key_features?.map(item => <div className='key-feature' key={item}><MdDone className='tick'/><p>{item}</p></div>)
              }
            </div>
          </div>

          <div className='information-container flex-spacing'>
            <h2>Bedroom Prices</h2>
            <div className='bedroom-prices-container'>
              {
                home &&
                Object.values(home.bedroom_prices).map((item, i) => <div className='bedroom-price'><p>Bedroom {i + 1}</p><p>£{item} per week</p></div>)
              }
            </div>
          </div>


        </div>

        
    </main>
  )
}

export default HomeDetails