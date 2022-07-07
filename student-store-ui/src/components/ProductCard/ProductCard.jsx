import * as React from "react"

export default function ProductCard(props) {
  return (
    <div className="product-card">
      <div className="media">
        <a href={`/products/${props.product.id}`}>
            <img src={props.product.image}/>
        </a>
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
      </div>
    </div>
  )
}
