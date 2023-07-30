import React, { useState } from 'react'
import './Footer.css'
import {BiLogoInstagramAlt} from 'react-icons/bi'
import {BsFacebook} from 'react-icons/bs'
import {AiFillTwitterCircle} from 'react-icons/ai'
import Modal from 'react-modal'

Modal.setAppElement(document.getElementById('root'));

const Footer = () => {

  //state for 'fake link' modal and response
  const [footerModalOpen, setFooterModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  //state for email modal and response
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');

  //function to open 'fake link' modal and set the message displayed
  const handleFakeLink = e => {
    setFooterModalOpen(true);
    setModalMessage(e.target.textContent);
  };

  return (
    <footer>
        <div className='contact-footer'>
          <form className='footer-form' onSubmit={e => {
            //opens email modal
            e.preventDefault();
            setEmailModalOpen(true);
            }}>
            <h2>Keep in touch</h2>
            <p>Curious about new offerings? Sign up for our weekly newsletter and stay informed.</p>
            <input className='footer-email' placeholder='Your email' value={contactEmail} onChange={e=>{setContactEmail(e.target.value)}} required/>
          </form>
          <div className='socials-container'>
            <h2>Let’s Socialize</h2>
            <div name='facebook' onClick={handleFakeLink} className='socials-link fake-link'><BsFacebook /><p>Facebook</p></div>
            <div name='twitter' onClick={handleFakeLink} className='socials-link fake-link'><AiFillTwitterCircle /><p>Twitter</p></div>
            <div name='instagram' onClick={handleFakeLink} className='socials-link fake-link'><BiLogoInstagramAlt /><p>Instagram</p></div>
          </div>
        </div>
        <div className='info-footer'>
            <div className='footer-info-container footer-nav'>
                <p name='about' className='fake-link' onClick={handleFakeLink} >About Us</p>
                <p name='terms' className='fake-link' onClick={handleFakeLink} >Terms & Conditions</p>
                <p name='privacy' className='fake-link' onClick={handleFakeLink} >Privacy & Cookie Policies</p>
            </div>
            <div className='footer-info-container'>
                <p>2022</p>
                <p>&copy; UniLife</p>
            </div>
        </div>

        <Modal isOpen={footerModalOpen} onRequestClose={()=>{setFooterModalOpen(false)}} className='modal-style footer-modal' overlayClassName='modal-style-overlay' contentLabel="Footer Modal">
          <h2>Thank you for pressing this link!</h2>
          <p>If this were a real website, you would be taken to {modalMessage}. Unfortunately, this is just a project for my portfolio!</p>
          <button onClick={()=>{setFooterModalOpen(false)}}>Back to site</button>
        </Modal>

        <Modal isOpen={emailModalOpen} onRequestClose={()=>{setEmailModalOpen(false); setContactEmail('')}} className='modal-style footer-modal' overlayClassName='modal-style-overlay' contentLabel="Email Modal">
          <h2>Thank you for signing up to our news letter!</h2>
          <p>{contactEmail}</p>
          <p>Unfortunately, this is just a project for my portfolio, so nothing will happen</p>
          <button onClick={()=>{setEmailModalOpen(false); setContactEmail('')}}>Back to site</button>
        </Modal>

    </footer>
  )
}

export default Footer