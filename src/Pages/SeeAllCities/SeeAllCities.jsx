import React, { useState, useEffect } from 'react'
import './SeeAllCities.css'
import Banner from '../../Components/Banner/Banner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const SeeAllCities = () => {
  
  //state to store array of all cities and organized array of all city names
  const [allCities, setAllCities] = useState([]);
  const [sortedCities, setSortedCities] = useState([]);
  
  //take name of city, find corresponding _id, navigate to city details and pass city id
  const nav = useNavigate();
  const navigateToCity = city => {

    const seletedCityId = allCities.find(item => item.name.toLowerCase() === city)._id

    nav(`/city-details/${seletedCityId}`)
  }

  //on first load, API call to store all cities and list of city names in alphabetical order
  useEffect(()=>{
    axios.get('https://unilife-server.herokuapp.com/cities?limit=20')
    .then(res=> {
      setSortedCities(res.data.response.map(item => item.name).sort());
      setAllCities(res.data.response);
    })
    .catch(err => console.log(err))
  },[])


  return (
    <main>
        <Banner title='Student Accommodation' subTitle='UniLife have student accommodation available across the UK. Whatever you’re after, we can help you find the right student accommodation for you.' />
    
        <h2 className='all-cities-title'>Search by City</h2>
    
        <div className='all-city-grid'>
          {
            sortedCities.map(item => <button key={item} onClick={()=>{navigateToCity(item.toLowerCase())}} className='city-btn'>{item}</button>)
          }
        </div>
    
    </main>
  )
}

export default SeeAllCities