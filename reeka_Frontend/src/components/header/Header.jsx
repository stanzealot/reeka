import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header id="header" className="fixed-top d-flex align-items-center header-transparent">
      <div className="container d-flex align-items-center justify-content-between">

        <div className="logo">
          <h1><Link to="/"><span><img src='/images/Logo.png'/></span></Link></h1>
        </div>

        <nav id="navbar" className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>

      </div>
    </header>
  )
}

export default Header