import * as React from "react"

export default function CartIcons(props) {
  return (
    <div className="cart-icons">
        <span className="cart-icon icon button" onClick={() => props.setIsOpen(true)}>
            <i className="material-icons md-48">add_shopping_cart</i>
        </span>
        <span className="cart-icon icon button" onClick={() => props.setIsOpen(true)}>
            <i className="material-icons md-48">monetization_on</i>
        </span><span className="cart-icon icon button" onClick={() => props.setIsOpen(true)}>
            <i className="material-icons md-48">fact_check</i>
        </span>
    </div>
  )
}