import React, { useEffect, useState, useContext } from 'react'
import './HomeDetails.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {LiaBedSolid, LiaBathSolid} from 'react-icons/lia';
import {AiOutlineHeart} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import { ShortlistContext } from './../../Contexts/ShortlistContext';
import Modal from 'react-modal'

const HomeDetails = () => {

    //store property id from url
    const {homeId} = useParams();

    //state to hold property object
    const [home, setHome] = useState('');

    //state to hold array of property images
    const [homeImages, setHomeImages] = useState([]);

    //state to store if property has been saved/ stored as favourite
    const [isShortlisted, setIsShortlisted] = useState(false);

    //state for managing booking modal and success message
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [bookingComplete, setBookingComplete] = useState(false);

    //import state and functions from context 
    const {shortlist, addHome, removeHome} = useContext(ShortlistContext);

    //state to hold user info from booking form
    const [bookingFormInput, setBookingFromInput] = useState({
      name: '',
      email: '',
      phone: '',
      message:''
    })

    //function to update form info (above) when user fills out booking form
    const handleForm = e => {
      setBookingFromInput({
        ... bookingFormInput,
        [e.target.name]:[e.target.value]
      })
    }

    //function to reset booking form and close modal
    const resetBookingModal = () => {
      setBookingModalOpen(false);
      setBookingComplete(false);
      setBookingFromInput({
        name: '',
        email: '',
        phone: '',
        message:''
      });
    }

    //on first load => API fetch property info using id from URL. Store object in 'home' state and store array of image urls in 'homeImages' state
    useEffect(()=>{
        axios.get(`https://unilife-server.herokuapp.com/properties/${homeId}`)
        .then(res => {
          setHome(res.data);
          setHomeImages(res.data.images);
        })
        .catch(err => console.log(err))
    },[])

    //when shortlist (context) is updated => check if this property is saved, and save result in 'isShortlisted' state
    useEffect(()=>{
      if(shortlist.some(item => item._id === homeId)) {
        setIsShortlisted(true)
      } else {
        setIsShortlisted(false)
      }
    }, [shortlist])

    //function to toggle saving adding/ removing from shortlist
    const toggleShortlist = () => {
      isShortlisted?
        removeHome(home)
      :
        addHome(home)
    }

    //function to swap main image with sub image
    const swapMainImage = i => {
      const newArray = homeImages.filter((item, index)=> index !== i);
      newArray.unshift(homeImages[i]);
      setHomeImages(newArray);
    }

  return (
    <main className='home-detail-page'>
        <Link to={`/city-details/${home.city_id?._id}`} className='back-link'>{`< Back to Search`}</Link>

        <div className='home-main-info-container'>
          <div className='home-images'>
            <img className='home-main-img' src={homeImages[0]} />
            <div className='sub-img-container'>
              {
                //create sub images buttons from homeImages array (but skip the first 'main' image)
                homeImages.filter((item, i) => i > 0).map((item, i) => <img onClick={()=>{swapMainImage(i + 1)}} key={item} className='sub-img' src={item} />)
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

                <button className={isShortlisted? 'shortlist-btn shortlisted' : 'shortlist-btn'} onClick={toggleShortlist}>
                  {
                    isShortlisted?
                      <><AiOutlineHeart className='shortlist-hrt'/>Un-Save</>
                    :
                      <><AiOutlineHeart className='shortlist-hrt'/>Save</>
                  }
                  
                </button>

                <button onClick={()=>{setBookingModalOpen(true)}}>Book Viewing</button>

                <Modal isOpen={bookingModalOpen} onRequestClose={resetBookingModal} className='modal-style booking-modal' overlayClassName='modal-style-overlay' contentLabel="Booking Modal">
                  {
                    bookingComplete?
                    <div className='modal-complete'>
                      <h2>{bookingFormInput.name}, Thank you for your booking!</h2>
                      <p>{home.address?.street}, {home.address?.city}, {home.address?.postcode}</p>
                      <p>This is just a portfolio website so nothing will actually happen. Thanks for using the form!</p>
                      <button onClick={resetBookingModal}>Back to site</button>
                    </div>
                    :
                    <>
                      <div className='modal-header'>
                        <h2>Book a Viewing</h2>
                        <svg className='modal-icon' xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none">
                          <path d="M19.525 63.7083V46.2H37.95V63.7083V46.2H19.525V63.7083ZM5.5 65.175V37.3083C5.5 36.5139 5.68333 35.7194 6.05 34.925C6.41667 34.1306 6.96667 33.4889 7.7 33L25.6667 20.1667C26.5833 19.5556 27.6069 19.25 28.7375 19.25C29.8681 19.25 30.8917 19.5556 31.8083 20.1667L49.6833 33C50.4167 33.4889 50.9667 34.1458 51.3333 34.9708C51.7 35.7958 51.8833 36.6361 51.8833 37.4917V41.8C51.0889 42.5333 50.3403 43.2972 49.6375 44.0917C48.9347 44.8861 48.3083 45.7722 47.7583 46.75V36.7583L28.6917 23.1917L9.625 36.7583V63.7083H19.525V46.2H37.95V63.7083H44.1833C44.3056 64.4417 44.4736 65.1444 44.6875 65.8167C44.9014 66.4889 45.1611 67.1611 45.4667 67.8333H33.7333V50.325H23.65V67.8333H8.15833C7.425 67.8333 6.79861 67.5736 6.27917 67.0542C5.75972 66.5347 5.5 65.9083 5.5 65.175ZM82.5 9.625V42.9C81.8889 42.1667 81.2319 41.5403 80.5292 41.0208C79.8264 40.5014 79.1083 39.9972 78.375 39.5083V9.625H41.8917V19.9833L37.7667 17.1417V9.71667C37.7667 8.55556 38.1639 7.5625 38.9583 6.7375C39.7528 5.9125 40.7306 5.5 41.8917 5.5H78.375C79.475 5.5 80.4375 5.9125 81.2625 6.7375C82.0875 7.5625 82.5 8.525 82.5 9.625ZM63.8917 23.7417H69.025V18.5167H63.8917V23.7417ZM66.825 75.1667C62.4861 75.1667 58.7889 73.6236 55.7333 70.5375C52.6778 67.4514 51.15 63.8 51.15 59.5833C51.15 55.1833 52.6778 51.4403 55.7333 48.3542C58.7889 45.2681 62.5167 43.725 66.9167 43.725C71.1944 43.725 74.8764 45.2681 77.9625 48.3542C81.0486 51.4403 82.5917 55.1833 82.5917 59.5833C82.5917 63.8 81.0486 67.4514 77.9625 70.5375C74.8764 73.6236 71.1639 75.1667 66.825 75.1667ZM65.5417 60.9583V69.3917C65.5417 69.8194 65.6944 70.1556 66 70.4C66.3056 70.6444 66.6417 70.7667 67.0083 70.7667C67.375 70.7667 67.6958 70.6292 67.9708 70.3542C68.2458 70.0792 68.3833 69.7583 68.3833 69.3917V60.9583H76.8167C77.2444 60.9583 77.5806 60.8056 77.825 60.5C78.0694 60.1944 78.1917 59.8583 78.1917 59.4917C78.1917 59.125 78.0694 58.8194 77.825 58.575C77.5806 58.3306 77.2444 58.2083 76.8167 58.2083H68.3833V49.6833C68.3833 49.3167 68.2458 48.9958 67.9708 48.7208C67.6958 48.4458 67.375 48.3083 67.0083 48.3083C66.6417 48.3083 66.3056 48.4458 66 48.7208C65.6944 48.9958 65.5417 49.3167 65.5417 49.6833V58.2083H57.1083C56.7417 58.2083 56.4208 58.3306 56.1458 58.575C55.8708 58.8194 55.7333 59.125 55.7333 59.4917C55.7333 59.8583 55.8861 60.1944 56.1917 60.5C56.4972 60.8056 56.8333 60.9583 57.2 60.9583H65.5417Z" fill="#3A5295"/>
                        </svg>
                      </div>
                      
                      <p>{home.address?.street}, {home.address?.city}, {home.address?.postcode}</p>

                      <form className='modal-form' onSubmit={e => {
                        e.preventDefault();
                        setBookingComplete(true);
                      }}>
                          <div className='modal-form-section booking-form-left'>
                            <div className='booking-form-input'>
                              <h3>Name</h3>
                              <input name='name' type='text' placeholder='Enter your name' onChange={handleForm} value={bookingFormInput.name} required/>
                            </div>
                            <div className='booking-form-input'>
                              <h3>Email</h3>
                              <input name='email' type='text' placeholder='Enter your email address' onChange={handleForm} value={bookingFormInput.email} required/>
                            </div>
                            <div className='booking-form-input'>
                              <h3>Phone Number</h3>
                              <input name='phone' type='text' placeholder='Enter your phone' onChange={handleForm} value={bookingFormInput.phone} required/>
                            </div>
                          </div>
                          <div className='modal-form-section booking-form-right'>
                            <div className='booking-form-input'>
                              <h3>Message</h3>
                              <textarea name='message' placeholder='Enter your message' onChange={handleForm} value={bookingFormInput.message} required/>
                            </div>
                            <button type='submit'>Submit</button>
                        </div>
                      </form>
                    </>
                  }
                </Modal>
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
                //convert home.bedroom_prices object to an array of just the values and map info to table
                Object.values(home.bedroom_prices).map((item, i) => <div key={`bedroom${i + 1}`} className='bedroom-price'><p>Bedroom {i + 1}</p><p>£{item} per week</p></div>)
              }
            </div>
          </div>


        </div>

        
    </main>
  )
}

export default HomeDetails