import React, { useEffect, useState } from 'react'
import './HomePage.css'
import Banner from '../../Components/Banner/Banner'
import searchIcon from '../../assets/travel_explore_FILL0_wght300_GRAD0_opsz48.svg'
import compareIcon from '../../assets/rule_FILL0_wght300_GRAD0_opsz48 1.svg'
import billsIcon from '../../assets/receipt_long_FILL0_wght300_GRAD0_opsz48.png'
import personImg from '../../assets/person.png'
import houseIcon from '../../assets/real_estate_agent_FILL0_wght300_GRAD0_opsz48.png'
import heartIcon from '../../assets/favorite_FILL0_wght300_GRAD0_opsz48.svg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {

  //state to store array of all cities
  const [allCities, setAllCities] = useState([]);

  //state to store value of chosen city from <select> element
  const [citySelect, setCitySelect] = useState('');

  //state to store array of city names
  const [sortedCities, setSortedCities] = useState([]);

  //function to update citySelect state from user selecting <option>
  const handleSelect = e => {setCitySelect(e.target.value)}

  //declare nav for using useNavigate hook
  const nav = useNavigate()

  //function to navigate to city details with city id
  const navigateToCity = city => {

    //finds city id from city name
    const seletedCityId = allCities.find(item => item.name.toLowerCase() === city)._id

    //navigate to city details with chosen id
    nav(`/city-details/${seletedCityId}`)
  }

  //on first load => API call and store array of city objects in allCities state.
  useEffect(()=>{
    axios.get('https://unilife-server.herokuapp.com/cities?limit=20')
    .then(res=> {
      setAllCities(res.data.response);
      //also set sortedCities state to just city names, organised alphabetically 
      setSortedCities(res.data.response.map(item => item.name).sort())
    })
    .catch(err => console.log(err))
  },[])

  return (
    <main>
        <Banner title='Find student homes with bills included' subTitle='A simple and faster way to search for student accommodation'/>
        
        <div className='filter-box search-city-box'>
          <select value={citySelect} onChange={handleSelect}>
            <option value=''>Search by city</option>
            {
              sortedCities.map(item => <option key={item} value={item}>{item}</option>)
            }
          </select>
          <button onClick={()=>{(citySelect !== '') && navigateToCity(citySelect.toLowerCase())}}>Find Homes</button>
        </div>


        <div className='top-cities-container'>
          <h2 id='top-cities-container-h2'>Student accommodations in our top cities</h2>
          <div className='top-city-grid'>
            {
              allCities.map(item => (
                <div key={item._id} onClick={()=>{navigateToCity(item.name.toLowerCase())}} className='top-city-item' style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image_url})`}}>
                  <h2>{item.name}</h2>
                  <p>{item.property_count} properties</p>
                </div>
              ))
            }
          </div>
          <Link to='/see-all-cities'><button>See All Cities</button></Link>
        </div>


        <div className='compare-top-container'>
          <h2>Compare all inclusive student homes.</h2>
          <div className='compare-points-container'>
            <div className='compare-point-item'>
              <img src={searchIcon}/>
              <h3>Search</h3>
              <p>Find your dream home in the perfect area near your university.</p>
            </div>
            <div className='compare-point-item'>
            <img src={compareIcon}/>
              <h3>Compare</h3>
              <p>Compare student accommodation to find the right home for you.</p>
            </div>
            <div className='compare-point-item'>
            <img src={billsIcon}/>
              <h3>Bills Included</h3>
              <p>Bills are included in all rent prices. No hidden fees.</p>
            </div>
          </div>
        </div>


        <div className='compare-bottom-container'>
          <div className='extra-info-container'>
            <div className='extra-info-group'>
              <div className='extra-info-item'>
                <img src={houseIcon} />
                <div className='extra-info-item-txt'>
                  <h3>Best selection</h3>
                  <p>Best selection of student accommodations. Never been easier to find a home that’s right for you.</p>
                </div>
              </div>
              <div className='extra-info-item'>
                <img src={heartIcon} />
                <div className='extra-info-item-txt'>
                  <h3>Your favorite</h3>
                  <p>Shortlist your favorite properties and send enquiries in one click.</p>
                </div>
              </div>
            </div>
            <Link to='/see-all-cities'><button>Search & Compare</button></Link>
          </div>
          <img src={personImg} className='person-img'/>
        </div> 
    </main>
  )
}

export default HomePage