import React, { useContext, useEffect, useState } from 'react'
import './Favourites.css'
import Banner from '../../Components/Banner/Banner';
import PropertyCard from '../../Components/PropertyCard/PropertyCard';
import { ShortlistContext } from '../../Contexts/ShortlistContext';
import { Link } from 'react-router-dom';

const Favourites = () => {

  //import shortlist from context
  const {shortlist} = useContext(ShortlistContext);

  return (
    <main>
      <Banner title='Favourite Properties' subTitle='Browse and compare your saved properties' noShrink={false}/>

      <div className='favourites-results'>
        {
          //conditional displays message if no properties saved
          (shortlist.length)?
          //saved properties
          <div className='property-grid'>
            {
              shortlist.map(item => <PropertyCard key={item._id} property={item}/>)
            }
          </div>
          :
          //no properties message
          <div className='no-fav-container'>
            <h2 className='no-fav-message'>No favourites saved!</h2>
            <Link to='/'><button>Explore Properties</button></Link>
          </div>
        }
      </div>
    </main>
  )
}

export default Favourites