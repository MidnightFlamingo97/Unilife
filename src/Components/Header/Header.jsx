import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logoIcon from './../../assets/holiday_village_FILL0_wght300_GRAD0_opsz48 3.png'
import logoText from './../../assets/UniLife.svg'
import { AiOutlineHeart, AiOutlineMail, AiOutlineClose } from "react-icons/ai"
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header>
      <Link className='logo' to='/'>
        <img src={logoIcon} />
        <img src={logoText} />
      </Link>
      <nav className={mobileNavOpen? 'mobile-nav-open' : ''}>
        <Link className='nav-link'><AiOutlineHeart className='header-icon' /><p>Shortlist</p></Link>
        <Link className='nav-link'><AiOutlineMail className='header-icon' /><p>Contact Us</p></Link>
      </nav>
      {
        mobileNavOpen?
        <AiOutlineClose onClick={()=>{setMobileNavOpen(false)}} className='header-icon mobile-menu-btn' />
        :
        <GiHamburgerMenu onClick={()=>{setMobileNavOpen(true)}} className='header-icon mobile-menu-btn' />
      }
    </header>
  )
}

export default Header