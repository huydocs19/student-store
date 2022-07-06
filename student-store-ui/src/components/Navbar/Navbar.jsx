import * as React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import Logo from "../Logo/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
    </nav>
  )
}
