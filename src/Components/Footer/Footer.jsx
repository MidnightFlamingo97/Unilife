import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import {BiLogoInstagramAlt} from 'react-icons/bi'
import {BsFacebook} from 'react-icons/bs'
import {AiFillTwitterCircle} from 'react-icons/ai'


const Footer = () => {
  return (
    <footer>
        <div className='contact-footer'>
          <form className='footer-form'>
            <h2>Keep in touch</h2>
            <p>Curious about new offerings? Sign up for our weekly newsletter and stay informed.</p>
            <input className='footer-email' placeholder='Your email' />
          </form>
          <div className='socials-container'>
            <h2>Let’s Socialize</h2>
            <Link className='socials-link'><BsFacebook /><p>Facebook</p></Link>
            <Link className='socials-link'><AiFillTwitterCircle /><p>Twitter</p></Link>
            <Link className='socials-link'><BiLogoInstagramAlt /><p>Instagram</p></Link>
          </div>
        </div>
        <div className='info-footer'>
            <div className='footer-info-container footer-nav'>
                <p>About Us</p>
                <p>Terms & Conditions</p>
                <p>Privacy & Cookie Policies</p>
            </div>
            <div className='footer-info-container'>
                <p>2022</p>
                <p>&copy; UniLife</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer