import * as React from "react"
import {Link} from "react-router-dom"
import codepath from "../../assets/codepath.svg"

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/"><img src={codepath} alt="codepath logo"/></Link>
    </div>
  )
}