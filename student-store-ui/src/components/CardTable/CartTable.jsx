import * as React from "react"

export default function CartTable(props) {
  const tax = props.shoppingCart.totalPrice * 0.8
  return (
    <div className="card-table">
      <div className="header">
        <div className="header-row">
            <span className="flex-2">Name</span>
            <span className="center">Quantity</span>
            <span className="center">Unit Price</span>
            <span className="center">Cost</span>
        </div>
        {props.shoppingCart.products.map((item, idx) => (
            <div className="product-row">
                <span className="flex-2 cart-product-name">{item.name}</span>
                <span className="center cart-product-quantity">{item.quantity}</span>
                <span className="center cart-product-price">${item.price}</span>
                <span className="center cart-product-subtotal">${item.price * item.quantity}</span>
            </div>
        ))}
        <div className="receipt">
            <div className="receipt-subtotal">
                <span className="label">Subtotal</span>
                <span></span><span></span>
                <span className="center subtotal">${props.shoppingCart.totalPrice}</span>
                </div>
            <div class="receipt-taxes">
                <span className="label">Taxes and Fees</span>
                <span></span><span></span>
                <span className="center">${tax}</span>
            </div>
            <div className="receipt-total">
                <span className="label">Total</span>
                <span></span><span></span>
                <span className="center total-price">${props.shoppingCart.total + tax}</span>
            </div>
        </div>
        
      </div>
    </div>
  )
}