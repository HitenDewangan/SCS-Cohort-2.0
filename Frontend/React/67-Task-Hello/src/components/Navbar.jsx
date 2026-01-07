import React from 'react'

const Navbar = () => {
  return (
    <div className='main'>
      <div className='navbar'>
        <div className='nav-left'>
          <div className='nav-logo'>
            <img className='logo' src="https://cdn.prod.website-files.com/6887bbbd362fae74a6532869/6887bbbd362fae74a65328f7_Logo.svg" alt="Logo" />
          </div>
          <div className='nav-links'>
            <a href="#">About Me</a>
            <a href="#">Portfolio</a>
            <a href="#">Services</a>
            <a href="#">Blog</a>
          </div>
        </div>
        <div className='nav-cta'>
          <a className='underline underline-offset-2' href="#">Book A Call</a>
            <i className="ri-arrow-right-up-line cta-icon"></i>
        </div>
      </div>
    </div>
  )
}

export default Navbar
