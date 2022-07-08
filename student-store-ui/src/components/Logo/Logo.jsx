import * as React from "react"
import {Link} from "react-router-dom"

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/"><img src="/assets/codepath.svg" alt="codepath logo"/></Link>
    </div>
  )
}