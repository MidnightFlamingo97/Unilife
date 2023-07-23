import React, { useEffect, useState } from 'react'
import './CityDetails.css'
import { useParams } from 'react-router-dom'
import Banner from './../../Components/Banner/Banner';
import axios from 'axios';
import PropertyCard from '../../Components/PropertyCard/PropertyCard';
import studentImg from '../../assets/students.png'

const CityDetails = () => {
  //get city id from url
  const {cityId} = useParams();

  //state for properties to display on UI
  const [cityProperties, setCityProperties] = useState([]);

  //state for object to store the options for the filter drop down menus
  const [options, setOptions] = useState({});

  //state for object to store the current chosen filter parameters
  const [filterOptions, setFilterOptions] = useState({
    city_id: cityId,
    bedroom_count: 'any',
    bathroom_count: 'any',
    property_type: 'any',
    rent: 'any'
  });

  //on first load
  useEffect(()=>{
    //retrieve all properties from chosen city (using cityId)
    axios.get(`https://unilife-server.herokuapp.com/properties/city/${cityId}`)
    .then(res => {

      //array of properties
      const properties = res.data.response;

      setOptions({
        //min bedroom filter drop down options. create array from 1 to the highest number of bedrooms on a single property in chosen city
        bedOptions:
          Array.from({ length: properties.reduce((prev, curr)=> {return (curr.bedroom_count > prev)? curr.bedroom_count : prev}, 0) }, (_, index) => index + 1),
        
        //min bathroom filter drop down options. create array from 1 to the highest number of bathrooms on a single property in chosen city
        bathOptions:
          Array.from({ length: properties.reduce((prev, curr)=> {return (curr.bathroom_count > prev)? curr.bathroom_count : prev}, 0) }, (_, index) => index + 1),
        
        //Home type filter drop down options. create array of all types in chosen city, remove duplicates, and organize alphabetically
        typeOptions:
          properties.map(item => item.property_type).reduce((newArr, item)=> {!newArr.includes(item) && newArr.push(item); return newArr}, []).sort(),
        
        //max price filter drop down options... (more complex so using IIFE)
        rentOptions: (()=>{
          //store lowest and highest rent values from properties in the chosen city
          const maxRent = properties.reduce((prev, curr)=> {return (curr.rent > prev)? curr.rent : prev}, 0);
          const minRent = properties.reduce((prev, curr)=> {return (curr.rent < prev)? curr.rent : prev}, maxRent);

          //create array from lowest rent to highest rent with increments of 200
          return Array.from({ length: Math.floor((maxRent - minRent) / 200) + 1 }, (_, index) => minRent + index * 200);
        })()
      })
    })
    .catch(err => console.log(err))
  },[])


  //when user changes the filter options
  useEffect(()=>{
    //create new query object from filterOptions state, removing key/values not in use (always requires cityId)
    const apiSearchQuery = {query: Object.fromEntries(Object.entries(filterOptions).filter(([key, value]) => value !== 'any'))}

    //new api call to retrieve filtered results & update state for displaying properties on UI
    axios.post('https://unilife-server.herokuapp.com/properties/filter', apiSearchQuery)
    .then(res => setCityProperties(res.data.response))
    .catch(err => console.log(err))
  },[filterOptions])


  // update filter state when user chooses different filter options 
  const handleSearchChange = (e) => {
    const { name, value } = e.target;

    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  return (
    <main>
        <Banner title='Search Accommodation' subTitle='Whatever you’re after, we can help you find the right student accommodation for you.' noShrink={true}/>

        <div className='filter-box search-filter-container'>
        <div className='filter-container'>
          <h3>Min Bedroom</h3>
          <select name='bedroom_count' value={filterOptions.bedroom_count} onChange={handleSearchChange}>
            <option value='any'>Any bedroom</option>
            {
              options.bedOptions?.map(item => <option key={item} value={item}>{item}</option>)
            }
          </select>
        </div>
        <div className='filter-container'>
          <h3>Min Bathroom</h3>
          <select name='bathroom_count' value={filterOptions.bathroom_count} onChange={handleSearchChange}>
            <option value='any'>Any bathroom</option>
            {
              options.bathOptions?.map(item => <option key={item} value={item}>{item}</option>)
            }
          </select>
        </div>
        <div className='filter-container'>
          <h3>Max price</h3>
          <select name='rent' value={filterOptions.rent} onChange={handleSearchChange}>
            <option value='any'>Any price</option>
            {
              options.rentOptions?.map(item => <option key={item} value={item}>${item}</option>)
            }
          </select>
        </div>
        <div className='filter-container'>
          <h3>Home type</h3>
          <select name='property_type' value={filterOptions.property_type} onChange={handleSearchChange}>
            <option value='any'>Any type</option>
            {
              options.typeOptions?.map(item => <option key={item} value={item}>{item}</option>)
            }
          </select>
        </div>
      </div>

      <h2 className='city-page-title'>{
        cityProperties.length == 0?
        'Sorry, there are no properties to show'
        :
        `${cityProperties.length} homes in ${cityProperties[0].address.city}`
      }</h2>

      <div className='property-grid'>
        {
          cityProperties.map(item => <PropertyCard key={item._id} property={item}/>)
        }
      </div>

      <div className='student-info'>
        <div className='student-info-txt'>
          <h2>Being a student in Leeds</h2>
          <p>Leeds is a lively and multicultural city with a large student population. It is quite a compact city, so it is easy to get around and has a community feel. Leeds is the perfect mix of city and town life and has something to offer to anyone who calls it home.</p>
          <p>Leeds is home to three universities, the University of Leeds, Leeds Trinity University and Leeds Beckett University</p>
        </div>
        <div className='student-img' style={{backgroundImage: `url(${studentImg})`}}></div>
      </div>

    </main>
  )
}

export default CityDetails