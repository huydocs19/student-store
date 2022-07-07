import * as React from "react"
import {Link} from "react-router-dom"

export default function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="media">
        <Link to={`/products/${props.product.id}`}><img src={props.product.image} alt="product cover"/></Link>        
      </div>
      <div className="product-info">
        <div className="main-info">
            <p className="product-name">{props.product.name}</p>
            <div className="stars">
                <p className="product-price">${props.product.price}</p>
            </div>
            <div className="desc">
                <p className="product-description">{props.showDescription && props.product.description}</p>
            </div>

        </div>
        <div className="actions">
          <div className="buttons">
            <button className="add" onClick={() => props.handleAddItemToCart(props.product.id)}>
              <i className="material-icons">add</i>
            </button>
            <button className="remove">
              <i className="material-icons" onClick={() => props.handleAddItemToCart(props.product.id)}>remove</i>
            </button>
          </div>
          <span className="product-quantity">
            <span className="amt">{props.quantity > 0 && props.quantity}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
