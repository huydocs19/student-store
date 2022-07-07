import * as React from "react"
import { Route, Link } from "react-router-dom"
import "./Navbar.css"
import Logo from "../Logo/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <ul class="links">
        <li><a href="/">Home</a></li>
        <li><a href="/#About">About Us</a></li>
        <li><a href="/#Contact">Contact Us</a></li>
        <li><a href="/#Buy">Buy Now</a></li>
      </ul>
    </nav>
  )
}
