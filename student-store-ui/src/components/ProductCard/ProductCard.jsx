import Stars from "../Stars/Stars"
import {Link} from "react-router-dom"
import codepath from "../../assets/codepath.svg"
import { formatPrice } from "../../utils/format"
import "./ProductCard.css"

export default function ProductCard({ product, quantity, addToCart, removeFromCart, showDescription }) {
  return (
    <div className="product-card">
      <div className="media">
        {product.image ? <Link to={`/store/${product.id}`}><img src={product.image} alt="product cover" /></Link> : <Link to={`/store/${product.id}`}><img src={codepath} alt="product cover" /></Link>}
      </div>
      <div className="product-info">
        <div className="main-info">
          <p className="product-name">{product.name}</p>
          <Stars rating={4.5} max={5} />
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
        {showDescription ? (
          <div className="desc">
              <p className="product-description">{product.description}</p>
          </div>): null
        }
                
        <div className="actions">
          <div className="buttons">
            <button className="add" onClick={addToCart}>
              <i className="material-icons">add</i>
            </button>
            <button className="remove">
              <i className="material-icons" onClick={removeFromCart}>remove</i>
            </button>
          </div>
          {quantity > 0 &&
            <span className="product-quantity">
              <span className="amt">{quantity}</span>
            </span>
          }
          
        </div>
      </div>
    </div>
  )
}
