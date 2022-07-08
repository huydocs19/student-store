import * as React from "react"
import "./SubNavBar.css"

export default function SubNavBar(props) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [category, setCategory] = React.useState("all")
  return (
    <nav className="sub-navbar">
        <div className="content">
            <div className="row">
                <div className="search-bar">
                    <input type="text" name="search" placeholder="Search" value={props.searchTerm} onChange={(event) => props.onSearchTermChange(event.target.value)}/>
                    <div onClick={props.searchProduct}><i className="material-icons">search</i></div>
                </div>
                <div className="links">
                    <span className="help"><i className="material-icons">help</i>Help</span>
                    <div className="cart">
                        <div onClick={props.onToggle}>My Cart<i className="material-icons">shopping_cart</i></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
                    <i className="material-icons">menu</i>
                </div>
                <ul className={`category-menu ${isOpen ? "open" : "closed"}`}>
                    <li className={category == "all"? "is-active": ""}><button onClick={() => {                        
                        props.changeCategory("all")
                        setCategory("all")
                    }}>All Categories</button></li>
                    <li className={category == "clothing"? "is-active": ""}><button onClick={() => {
                        props.changeCategory("clothing")
                        setCategory("clothing")
                    }}>Clothing</button></li>
                    <li className={category == "food"? "is-active": ""}><button onClick={() => {
                        props.changeCategory("food")
                        setCategory("food")
                    }}>Food</button></li>
                    <li className={category == "accessories"? "is-active": ""}><button onClick={() => {
                        props.changeCategory("accessories")
                        setCategory("accessories")
                    }}>Accessories</button></li>
                    <li className={category == "tech"? "is-active": ""}><button onClick={() => {
                        props.changeCategory("tech")
                        setCategory("tech")
                    }}>Tech</button></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}