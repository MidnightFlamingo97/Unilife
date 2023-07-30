import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logoIcon from './../../assets/holiday_village_FILL0_wght300_GRAD0_opsz48 3.png'
import logoText from './../../assets/UniLife.svg'
import { AiOutlineHeart, AiOutlineMail, AiOutlineClose } from "react-icons/ai"
import { GiHamburgerMenu } from 'react-icons/gi'
import Modal from 'react-modal'

Modal.setAppElement(document.getElementById('root'));

const Header = () => {

  //states for opening/ closing mobile nav menu
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  //state for contact us modal
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactComplete, setContactComplete] = useState(false);

  //state to hold info from the contact form
  const [contactFormInput, setContactFormInput] = useState({
    name:'',
    phone:'',
    status:'Student',
    email:'',
    message:''
  });

  //updates contact form state (above) when user fills out contact form
  const handleContactForm = e => {
    setContactFormInput({
      ... contactFormInput,
      [e.target.name]:[e.target.value]
    })
  };

  //function to reset contact form and close modal
  const resetContactModal = () => {
    setContactComplete(false);
    setContactModalOpen(false);
    setContactFormInput({
      name:'',
      phone:'',
      status:'Student',
      email:'',
      message:''
    })
  };


  return (
    <header>
      <Link className='logo' to='/'>
        <img src={logoIcon} />
        <img src={logoText} />
      </Link>
      <nav className={mobileNavOpen? 'mobile-nav-open' : ''}>
        <Link to='/favourites' className='nav-link'><AiOutlineHeart className='header-icon' /><p>Favourites</p></Link>
        <div className='nav-link' onClick={()=>{setContactModalOpen(true)}}><AiOutlineMail className='header-icon' /><p>Contact Us</p></div>
      </nav>
      {
        //swap hamburger icon to X icon when open
        mobileNavOpen?
        <AiOutlineClose onClick={()=>{setMobileNavOpen(false)}} className='header-icon mobile-menu-btn' />
        :
        <GiHamburgerMenu onClick={()=>{setMobileNavOpen(true)}} className='header-icon mobile-menu-btn' />
      }

      <Modal isOpen={contactModalOpen} onRequestClose={resetContactModal} className='modal-style booking-modal' overlayClassName='modal-style-overlay' contentLabel="Contact Modal">
        {
          //conditional checks if they have completed the form to show success message in the same modal
          contactComplete?
          //success message
          <div className='modal-complete'>
            <h2>{contactFormInput.name}, Thank you for your message!</h2>
            <p>This is just a portfolio project, so nothing will happen. Thanks for using the form!</p>
            <button onClick={resetContactModal}>Back to site</button>
          </div>
          :
          //contact form
          <>
            <div className='modal-header'>
              <h2>Contact us</h2>
              <svg className='modal-icon' xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                <path d="M2.91699 69.8334C2.12255 69.8334 1.4656 69.5737 0.946159 69.0542C0.426715 68.5348 0.166992 67.8779 0.166992 67.0834V42.0584C0.166992 41.264 0.426715 40.5917 0.946159 40.0417C1.4656 39.4917 2.12255 39.2167 2.91699 39.2167H15.2003V19.6917C15.2003 14.1917 17.1253 9.56258 20.9753 5.80425C24.8253 2.04591 29.5003 0.166748 35.0003 0.166748H50.5837C55.9003 0.166748 60.4378 2.07647 64.1962 5.89591C67.9545 9.71536 69.8337 14.314 69.8337 19.6917V67.7251C69.8337 68.3362 69.635 68.8404 69.2378 69.2376C68.8406 69.6348 68.3364 69.8334 67.7253 69.8334C67.1142 69.8334 66.6253 69.6348 66.2587 69.2376C65.892 68.8404 65.7087 68.3362 65.7087 67.7251V59.1084H46.917V67.0834C46.917 67.8779 46.5962 68.5348 45.9545 69.0542C45.3128 69.5737 44.5337 69.8334 43.617 69.8334H2.91699ZM46.917 54.9834H65.7087V19.6917C65.7087 15.414 64.2267 11.7779 61.2628 8.78341C58.2989 5.78897 54.7392 4.29175 50.5837 4.29175H35.0003C30.6614 4.29175 26.9795 5.77369 23.9545 8.73758C20.9295 11.7015 19.417 15.3529 19.417 19.6917V39.2167H43.617C44.5337 39.2167 45.3128 39.4765 45.9545 39.9959C46.5962 40.5154 46.917 41.2029 46.917 42.0584V54.9834ZM30.692 25.7417C30.0809 25.7417 29.5767 25.5431 29.1795 25.1459C28.7823 24.7487 28.5837 24.2445 28.5837 23.6334C28.5837 23.0834 28.7823 22.5945 29.1795 22.1667C29.5767 21.739 30.0809 21.5251 30.692 21.5251H54.4337C54.9837 21.5251 55.4573 21.739 55.8545 22.1667C56.2517 22.5945 56.4503 23.0834 56.4503 23.6334C56.4503 24.2445 56.2517 24.7487 55.8545 25.1459C55.4573 25.5431 54.9837 25.7417 54.4337 25.7417H30.692ZM22.992 54.0667C23.1142 54.189 23.2823 54.2501 23.4962 54.2501C23.71 54.2501 23.9087 54.189 24.092 54.0667L42.7003 43.4334H4.29199L22.992 54.0667ZM4.29199 65.7084H42.7003V47.4667L26.2003 56.9084C25.7725 57.1529 25.3448 57.3362 24.917 57.4584C24.4892 57.5806 24.0309 57.6417 23.542 57.6417C23.0531 57.6417 22.5948 57.5806 22.167 57.4584C21.7392 57.3362 21.3114 57.1529 20.8837 56.9084L4.29199 47.4667V65.7084ZM4.29199 43.4334V48.0167V47.4667V65.7084V47.4667V48.0167V44.9001C4.29199 44.5945 4.29199 44.5945 4.29199 44.9001V43.4334Z" fill="#3A5295"/>
              </svg>
            </div>
            
            <p>Feel free to contact us if you have any questions. Looking forward to hear from you.</p>
          
            <form className='modal-form' onSubmit={e => {
              e.preventDefault();
              setContactComplete(true);
            }}>
                <div className='modal-form-section booking-form-left'>
                  <div className='booking-form-input'>
                    <h3>Name</h3>
                    <input name='name' type='text' placeholder='Enter your name' onChange={handleContactForm} value={contactFormInput.name} required/>
                  </div>
                  <div className='booking-form-input'>
                    <h3>Phone Number</h3>
                    <input name='phone' type='text' placeholder='Enter your phone number' onChange={handleContactForm} value={contactFormInput.phone} required/>
                  </div>
                  <div className='booking-form-input'>
                    <h3>Are you a...</h3>
                    <select name='status' onChange={handleContactForm} value={contactFormInput.status} required >
                      <option value='Student'>Student</option>
                      <option value='Part-Time-Student'>Part-Time Student</option>
                      <option value='Parent'>Parent</option>
                    </select>
                  </div>
                </div>
                <div className='modal-form-section booking-form-right'>
                <div className='booking-form-input'>
                    <h3>Email</h3>
                    <input name='email' type='text' placeholder='Enter your email address' onChange={handleContactForm} value={contactFormInput.email} required/>
                  </div>
                  <div className='booking-form-input'>
                    <h3>Message</h3>
                    <textarea name='message' placeholder='Enter your message' onChange={handleContactForm} value={contactFormInput.message} required/>
                  </div>
                  <button type='submit'>Submit</button>
              </div>
            </form>
          </>
        }
      </Modal>
    </header>
  )
}

export default Header