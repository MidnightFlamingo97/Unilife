import React from 'react'
import './PropertyCard.css'
import { Link } from 'react-router-dom'
import {LiaBedSolid, LiaBathSolid} from 'react-icons/lia'
import {IoLocationOutline} from 'react-icons/io5'
import {PiHouseLight} from 'react-icons/pi'

const PropertyCard = ({property}) => {
  return (
    <Link to={`/home-details/${property._id}`} className='property-card'>
        <img className='main-img' src={property.images[0]} />
        <div className='main-info-container'>
            <div className='price-container'>
                <h3>£{property.rent}</h3>
                <p>pppw including bills</p>
            </div>
            <div className='room-info-container'>
                <div className='room-info-block'>
                    <LiaBedSolid className='room-icon'/>
                    <p>{property.bedroom_count}</p>
                </div>
                <div className='room-info-block'>
                    <LiaBathSolid className='room-icon' />
                    <p>{property.bedroom_count}</p>
                </div>
            </div>
        </div>
        <div className='sub-info-container'>
            <div className='home-info'>
                <h4>{property.property_type}</h4>
                <h4 className='furnish-info'>{property.furnished}</h4>
            </div>
            <div className='home-location'>
                <IoLocationOutline className='location-icon'/>
                <address>{property.address.street}, {property.address.city}, {property.address.postcode}</address>
            </div>
        </div>
        <div className='view-home'>
            <PiHouseLight className='home-icon'/>
            <h4>View Home</h4>
        </div>
    </Link>
  )
}

export default PropertyCard