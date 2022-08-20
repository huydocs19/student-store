import * as React from "react"
import { Link } from "react-router-dom"
import {Logo, Instagram, Facebook, Twitter} from "components"
import person from "../../assets/person.svg"
import "./NavBar.css"

export default function NavBar({user, handleLogout}) {
  return (
     <nav className="navbar">
      <div className="content">
        <Logo />
        <div className="socials">
          <Twitter fill="var(--pure-white)" />
          <Instagram fill="var(--pure-white)" />
          <Facebook fill="var(--pure-white)" />
        </div>
        <ul className="links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/#About">About Us</Link></li>
          <li><Link to="/#Contact">Contact Us</Link></li>
          <li><Link to="/#Buy">Buy Now</Link></li>
          <div className="auth">
              {user?.email ? (
                <div className="user-buttons">
                  <Link to="/orders">
                    <img src={person} alt="avatar" />
                    {user.email}
                  </Link>
                  <span onClick={handleLogout}>Logout</span>
                </div>
              ) : (
                <Link to="/login">
                  <img src={person} alt="avatar" />
                  Login
                </Link>
              )}
            </div>          
        </ul>
      </div>
      
    </nav>
  )
}
